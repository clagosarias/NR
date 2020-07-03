import Host from './host.js'

export default class Data {
  constructor() {
    return(async () => {
      let json = await fetch("http://127.0.0.1:8080/assets/host-app-data.json")
      .then(response => response.json())
      const t0 = performance.now();
      this.hostsMap = this.mapHosts(json);
      const t1 = performance.now();
      console.log( t1 - t0 + ' ms')
      return this
    })()
  }
  // map1[key: String[host], value: map2[key: apdex, value: Array[applications]]]

  // map1 = {
  //   'host1': {
  //     100: ['Application1', 'Application2'],
  //     99: ['Application1', 'Application2']
  //   }
  // }
  // TODO: añadir comentario de ordenar 25 apps cuando hay 26 con la misma nota
  mapHosts(json) {
    let _hosts = new Map();
    json.sort((a, b) => b.apdex - a.apdex);

    // o(n*m)
    for (let i = 0, len = json.length; i < len; ++i) {
      for (let j = 0, lenJ = json[i].host.length; j < lenJ; ++j) {
        const found = _hosts.get(json[i].host[j]);
        if (!found) {
          _hosts.set(json[i].host[j], new Host(json[i].host[j], json[i]));
        }
        else {
          _hosts.get(json[i].host[j]).addApplication(json[i]);
        }
      }
    }

    return _hosts
  }

  getTopAppsByHost(name) {
    return this.hostsMap.get(name).topApplications();
  }

  get hosts() {
    return this.hostsMap;
  }
}
