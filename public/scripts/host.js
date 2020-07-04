'use strict'
export default class Host {
  constructor(name, application) {
    this._name = name;
    this._applications = [application];
  }

  get applications() {
    return this._applications.length >= 5 ? this._applications.slice(0,4) : this._applications;
  }

  get name() {
    return this._name;
  }

  topApplications() {
    return this.applications.length >= 25 ? this._applications.slice(0,24) : this._applications;
  }

  addApplication(application) {
    /*
    We could consider removing data that we won't need in the {application} object before inserting it into the host with something like:
    this._applications.push((({ host, contributors, ...app }) => app)(application));
    But ,if we can afford occupying the memory space, it's faster to leave them.
    */
    this._applications.push(application)
  }

  addApplicationInOrder(application) {
    // O(n*m)
    for (let i = 0, len = this._applications.length; i < len; ++i) {
      if (this._applications[i].apdex <= application.apdex) {
        this._applications.splice(i, 0, application)
        break;
      }
    }
  }

  removeApplication(application) {
    // O(n*m)
    for (let i = 0, len = this._applications.length; i < len; ++i) {
      if (this._applications[i].name === application.name) {
        this._applications.splice(i, 1);
        break;
      }
    }
  }
}