import Data from './data.js'
import UI from './ui.js'

export const main = async err => {
  if (err) {
    alert('An error has occured. please try again.\n' + err)
  }
  else {
    let data = await new Data();
    UI.declareElements('#checkboxInput', '#appContent');
    // console.log(data.getTopAppsByHost("92116865-5462.conor.com"))

    // forEach is actually faster in small number of items
    data.hostsMap.forEach(host => {
      // Writes HTML to be used to instantiate an `<app-drawer>` element with a `usercompname` attribute
      const hostElemInstance = `<host-element>
                                <p class="host__name" slot="name">${host.name}</p>
                                <ul class="host__list" slot="appList">
                                  ${host.applications.map(app =>`
                                    <application-element release="${app.version}">
                                      <p class="application__apdex" slot="appApdex">${app.apdex}</p>
                                      <p class="application__name" slot="appName">${app.name}</p>
                                    </application-element>
                                  `).join('')}
                                </ul>
                              </host-element>`;

      // Creates the new `<app-drawer>` element, appended to the `<main>` element
      UI.appContent.insertAdjacentHTML("beforeend", hostElemInstance);
    });

    console.log(data.hostsMap);
    // console.log(data.getTopAppsByHost("92116865-5462.conor.com"))
  }
}