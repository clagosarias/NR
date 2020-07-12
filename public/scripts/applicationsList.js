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

  mapHosts(json) {
    let _hosts = new Map();
    // json.sort((a, b) => b.apdex - a.apdex); 0(n*logn)

    // O(n*m)
    for (let i = 0, len = json.length; i < len; ++i) {
      // An attempt at trying to cache the variable and making it more readable
      const application = json[i];
      for (let j = 0, lenJ = json[i].host.length; j < lenJ; ++j) {
        // same cache process here
        const hostName = application.host[j];

        if (!_hosts.get(hostName)) {
          _hosts.set(hostName, new Host(hostName, application));
        }

        else {
          _hosts.get(hostName).addApplication(application);
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
      const hostName = app.host[i];

      if (this.hostsMap.get(hostName)) {
        this.hostsMap.get(hostName).addApplication(app);
      } else {
        this.hostsMap.set(hostName, new Host(hostName, app));
      }
    }
  }

  removeAppFromHosts(app) {
    for (let i = 0, len = app.host.length; i < len; ++i) {
      this.hostsMap.get(app.host[i]).removeApplication(app);
    }
  }
}
