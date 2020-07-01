import Host from './host.js'

export default class Data {
  constructor() {
    return(async () => {
      let json = await fetch("http://127.0.0.1:8080/assets/host-app-data.json")
      .then(response => response.json())
      this.hostsMap = this.mapHosts(json);
      return this
    })()
  }

  mapHosts(json) {
    let _hosts = [];
    json.sort((a, b) => b.apdex - a.apdex)

    for (var i = 0, len = json.length; i < len; ++i) {
      for (var j = 0, lenJ = json[i].host.length; j < lenJ; ++j) {
        const found = _hosts.findIndex(host => host.name === json[i].host[j]); // TODO: IE11 polyfill

        if (found === -1) {
          _hosts.push(new Host(json[i].host[j], json[i]))
        }
        else {
          _hosts[found].applications.push(json[i])
        }
      }
    }
    return _hosts
  }

  getTopAppsByHost(name) {
    return this.hostsMap[this.hostsMap.findIndex(host => host.name === name)].applications.slice(0, 25);
  }

  get hosts() {
    return this.hostsMap;
  }
}
