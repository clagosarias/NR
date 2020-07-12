'use strict'
export default class Host {
  constructor(name, application) {
    this._name = name;
    this._applications = new Map().set(application.apdex, new Set().add(application));
  }

  get applications() {
    let appArr = [];

    for (let i = 100; i > 0; --i) {
      if (appArr.length >= 5) {
        break;
      }
      else if (this._applications.get(i)) {
        appArr = appArr.concat(Array.from(this._applications.get(i)))
      }
    }

    return appArr.slice(0, 5);
  }

  get allApplications() {
    /*
      Used only for testing purposes
    */
    return this._applications;
  }

  get name() {
    return this._name;
  }

  topApplications() {
    let appArr = [];

    for (let i = 100; i > 0; --i) {
      if (appArr.length >= 25) {
        break;
      }

      if (this._applications.get(i)) {
        appArr = appArr.concat(Array.from(this._applications.get(i)))
      }
    }

    return appArr.slice(0, 25);
  }

  addApplication(application) {
    /*
      We could consider removing data that we won't need in the {application} object before inserting it into the host with something like:
      this._applications.push((({ host, contributors, ...app }) => app)(application));
      But ,if we can afford occupying the memory space, it's faster to leave them.
    */
    if (this._applications.get(application.apdex)) {
      this._applications.get(application.apdex).add(application);
    } else {
      this._applications.set(application.apdex, new Set().add(application))
    }
  }

  // addApplicationInOrder(application) {
  //   this._applications.get(application.apdex).add(application);
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
    // for (let i = 0, len = this._applications.length; i < len; ++i) {
    //   if (this._applications[i].name === application.name) {
    //     this._applications.splice(i, 1);
    //     break;
    //   }
    // }

    this._applications = this.removeObjectFromSet(this._applications.get(application.apdex), application)
  }

  removeObjectFromSet (set, obj) {
    return new Set([...set].filter((el) => el.name != obj.name))
  }
}