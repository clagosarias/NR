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
    const main = document.querySelector("#appContent");

    // for (var i = 0, len = data.hostsMap.length; i < len; ++i) {
    //   const myElemInstance = `<my-element name="${data.hostsMap[i].name}"></my-element>`
    //   main.insertAdjacentHTML("beforeend", myElemInstance);
    // }

    data.hostsMap.forEach(host => {
      // Identifies the string to pass into the component instance as an attribute
      const hostName = host.name;

      // Writes HTML to be used to instantiate an `<app-drawer>` element with a `usercompname` attribute
      const myElemInstance = `<my-element name=${hostName}></my-element>`;

      // Creates the new `<app-drawer>` element, appended to the `<main>` element
      main.insertAdjacentHTML("beforeend", myElemInstance);
    });
  }
}