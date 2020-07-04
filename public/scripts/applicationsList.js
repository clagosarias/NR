'use strict'
import Host from './host.js'

export default class ApplicationsList {
  constructor() {
    return(async () => {
      let json = await fetch("http://127.0.0.1:8080/assets/host-app-data.json")
      .then(response => response.json())
      this.hostsMap = this.mapHosts(json);
      return this
    })()
  }
  // map1[key: String[host], value: map2[key: apdex, value: Array[applications]]]

  // map1 = {
  //   'host1': {
  //      new Host(name, mapApplicaciones[key: apdex, value: Set[new App(name, version, apdex)]], mapApdex[key: app, value: apdex])
  //   }
  // }
  // TODO: añadir comentario de ordenar 25 apps cuando hay 26 con la misma nota

  /*
  mapDel(key:app, value:[hosts])
  */

  mapHosts(json) {
    let _hosts = new Map();
    json.sort((a, b) => b.apdex - a.apdex);

    // o(n*m)
    for (let i = 0, len = json.length; i < len; ++i) {
      for (let j = 0, lenJ = json[i].host.length; j < lenJ; ++j) {
        // An attempt at trying to cache the expression and making it more readable
        const hostName = json[i].host[j];

        if (!_hosts.get(hostName)) {
          _hosts.set(hostName, new Host(hostName, json[i]));
        }

        else {
          _hosts.get(hostName).addApplication(json[i]);
        }
      }
    }

    return _hosts
  }

  getTopAppsByHost(name) {
    return this.hostsMap.get(name).topApplications();
  }

  addAppToHosts(app) {
    for (let i = 0, len = app.host.length; i < len; ++i) {
      this.hostsMap.get(app.host[i]).addApplicationInOrder(app);
    }
  }

  removeAppFromHosts(app) {
    for (let i = 0, len = app.host.length; i < len; ++i) {
      this.hostsMap.get(app.host[i]).removeApplication(app);
    }
  }
}
