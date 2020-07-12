'use strict'
export default class Host {
  constructor(name, application) {
    this._name = name;
    // this._applications = Map['100' : set[{app1}, {app2}, ...], '99': set[...]]
    this._applications = new Map().set(application.apdex, new Set().add(application));
    this._numberOfApps = 1;
  }

  get applications() {
    return this.getApplicationsAsArray(5)
  }

  get allApplications() {
    /*
      Used only for testing purposes
    */
    return this.getApplicationsAsArray(this._numberOfApps);
  }

  get name() {
    return this._name;
  }

  getApplicationsAsArray(length) {
    let applications = [];

    for (let i = 100; i > 0; --i) {
      if (applications.length >= length || applications.length === this._numberOfApps) {
        break
      }
      if (this._applications.get(i)) {
        applications = applications.concat(Array.from(this._applications.get(i)));
      }
    }

    return applications.slice(0, length);
  }

  topApplications() {
    return this.getApplicationsAsArray(25)
  }

  addApplication(application) {
    /*
      We could consider removing data that we won't need in the {application} object before inserting it into the host with something like:
      this._applications.push((({ host, contributors, ...app }) => app)(application));
      But ,if we can afford occupying the memory space, it's faster to leave them.
    */
    const apdexSet = this._applications.get(application.apdex);
    if (apdexSet) {
      apdexSet.add(application)
    } else {
      this._applications.set(application.apdex, new Set().add(application))
    }

    this._numberOfApps += 1;
  }

  // addApplicationInOrder(application) {
  //   // O(n*m)
  //   for (let i = 0, len = this._applications.length; i < len; ++i) {
  //     if (this._applications[i].apdex <= application.apdex) {
  //       this._applications.splice(i, 0, application);
  //       return;
  //     }
  //   }

  //   this._applications.push(application);
  // }

  removeApplication(application) {
    // O(n*m)
    const apdexSet = this._applications.get(application.apdex);
    this._applications.set(application.apdex, new Set([...apdexSet].filter(app => app.name != app.name)))
  }
}