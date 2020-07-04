'use strict'
import ApplicationsList from './applicationsList.js'
import UI from './ui.js'

export const main = async err => {
  if (err) {
    alert('An error has occured. please try again.\n' + err)
  }
  else {
    let applicationsList = await new ApplicationsList();
    UI.declareElements('#checkboxInput', '#appContent', "app-modal");

    for (let [hostName, host] of applicationsList.hostsMap) {
      /*
        I considered creating a template literal string called hostNodes that would have all the hostElemInstance
        and apply the insertAdjacentHTML only once after the loop instead of every iteration.
        But least for my calculations, the page rendered faster when doing it inside the for loop.
      */

      /*
        Using map to iterate over the array of applications is a decision I took because applications will have a max of 5 items, so the performance
        variation between a map or a for should be near to non-significant compared to the readibility provided by the built-in map function.
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
    // const t0 = performance.now();
    // applicationsList.addAppToHosts({"name":"Small Fresh Pants - Kautzer - Boyer, and Sons","contributors":["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],"version":7,"apdex":68,"host":["7e6272f7-098e.dakota.biz","9a450527-cdd9.kareem.info","e7bf58af-f0be.dallas.biz"]},)
    // const t1 = performance.now();
    // console.log(t1 - t0 + ' ms');
    // applicationsList.getTopAppsByHost("92116865-5462.conor.com")
  }
}