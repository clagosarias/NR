//Fastest
class UI {
  constructor(checkboxInput, appContent) {
      this._checkboxInput = document.querySelector(checkboxInput);
      this._appContent = document.querySelector(appContent);
  }

  addCheckboxListener() {
      this._checkboxInput.addEventListener('change', (e) => {
          e.target.checked ? this.changeContentList() : this.changeContentGrid();
      }, false);
  }

  changeContentList() {
      this._appContent.classList.add('list')
  }

  changeContentGrid() {
      this._appContent.classList.remove('list')
  }
}

class Mock {
  constructor() {
      fetch("http://127.0.0.1:8080/assets/host-app-data.json")
      .then(response => response.json())
      .then(json => {
          this.data = json;
          this.hostsMap = this.mapHosts();
      });
  }

  mapHosts() {
      let _hosts = [];
      this.data.sort((a, b) => b.apdex - a.apdex) // TODO: transform into a class Method
      for (var i = 0, len = this.data.length; i < len; ++i) {
          for (var j = 0, lenJ = this.data[i].host.length; j < lenJ; ++j) {
              const found = _hosts.findIndex(host => host.name === this.data[i].host[j]); // TODO: IE11 polyfill
              if (found === -1) _hosts.push({ name: this.data[i].host[j], applications: [this.data[i]] }) // TODO: instead of copying the whole "app" add a Class method to clone using spread operator without the "host" property.
              else _hosts[found].applications.push(this.data[i])
          }
      }
      return _hosts
  }
}

function init() {
  const mock = new Mock();
  const ui = new UI('#checkboxInput', '#appContent');
  ui.addCheckboxListener();
  console.log(mock)
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});