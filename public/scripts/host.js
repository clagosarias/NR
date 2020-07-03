export default class Host {
  constructor(name, application) {
    this._name = name;
    // this._applications = [(({ host, ...o }) => o)(application)]; TODO: check performance
    this._applications = [];
    this._apdexMap = new Map();
    this._apdexMap.set(application.name, application.apdex);
  }

  get applications() {
    return this._applications.slice(0,4);
  }

  get name() {
    return this._name;
  }

  topApplications() {
    return this._applications.slice(0,24);
  }

  addApplication(application) {
    this._applications.push(application);
    this._apdexMap.set(application.name, application.apdex);
  }
}