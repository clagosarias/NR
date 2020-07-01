import Data from './data.js'
import UI from './ui.js'

export const main = async err => {
  if (err) {
    alert('Could not load polyfills, please try again.\n' + err)
  }
  else {
    let data = await new Data();
    const ui = new UI('#checkboxInput', '#appContent');
    ui.addCheckboxListener();
    // console.log(data.getTopAppsByHost("92116865-5462.conor.com"))
    const appContent = document.querySelector("#appContent");

    // forEach is actually faster in small number of items
    data.hostsMap.forEach(host => {
      // Writes HTML to be used to instantiate an `<app-drawer>` element with a `usercompname` attribute
      const myElemInstance = `<my-element name=${host.name}></my-element>`;

      // Creates the new `<app-drawer>` element, appended to the `<main>` element
      appContent.insertAdjacentHTML("beforeend", myElemInstance);
    });
  }
}