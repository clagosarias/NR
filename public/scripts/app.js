'use strict'
import ApplicationsList from './applicationsList.js'
import UI from './ui.js'

(async () => {
  let applicationsList = await new ApplicationsList();
  UI.declareElements('#checkboxInput', '#appContent', "app-modal");

  for (let [hostName, host] of applicationsList.hostsMap) {
    /*
      I considered creating a template literal string called hostNodes that would have all the hostElemInstance
      and apply the insertAdjacentHTML only once after the loop instead of every iteration.
      But at least for my calculations, the page rendered faster when doing it inside the for loop.
    */

    /*
      Using map to iterate over the array of applications is a decision I took because applications will have a max of 5 items, so the performance
      variation between a map and a for should be near to non-significant compared to the readibility provided by the built-in map function.
    */
    const hostElemInstance = `<host-element>
                              <p class="host__name" slot="name">${hostName}</p>
                              <ul class="host__list" slot="appList">
                                ${host.applications.map(app =>`
                                  <application-element release="${app.version}">
                                    <p class="application__apdex" slot="appApdex">${app.apdex}</p>
                                    <p class="application__name" slot="appName">${app.name}</p>
                                  </application-element>
                                `).join('')}
                              </ul>
                            </host-element>`;

    UI.appContent.insertAdjacentHTML("beforeend", hostElemInstance);
  };
})()