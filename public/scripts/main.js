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
      const myElemInstance = `<my-element>
                                <p class="host__name" slot="name">${host.name}</p>
                                <ul class="host__list" slot="appList">
                                  ${host.topApplications.map(app =>`
                                    <li class="host__list__application">
                                      <p class="application__apdex">${app.apdex}</p>
                                      <p class="application__name">${app.name}</p>
                                    </li>
                                  `).join('')}
                                </ul>
                              </my-element>`;

      // Creates the new `<app-drawer>` element, appended to the `<main>` element
      UI.appContent.insertAdjacentHTML("beforeend", myElemInstance);
    });
  }
}