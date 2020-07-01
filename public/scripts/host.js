export default class Host {
  constructor(name, application) {
    this._name = name;
    this._applications = [(({ host, ...o }) => o)(application)];
  }

  get applications() {
    return this._applications;
  }

  get name() {
    return this._name;
  }
}