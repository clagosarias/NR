import Data from './data.js'
import UI from './ui.js'

export const main = async err => {
  if (err) {
    alert('An error has occured. please try again.\n' + err)
  }
  else {
    let data = await new Data();
    UI.declareElements('#checkboxInput', '#appContent', "app-modal");

    // forEach is actually faster in small number of items
    // TODO: transform into for loop
    data.hostsMap.forEach(host => {
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

      UI.appContent.insertAdjacentHTML("beforeend", hostElemInstance);
    });

    // data.removeAppFromHosts({"name":"Small Fresh Pants - Kautzer - Boyer, and Sons","contributors":["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],"version":7,"apdex":68,"host":["7e6272f7-098e.dakota.biz","9a450527-cdd9.kareem.info","e7bf58af-f0be.dallas.biz"]},)
    console.log(data.getTopAppsByHost("92116865-5462.conor.com"))
  }
}