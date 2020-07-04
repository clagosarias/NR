'use strict'
import { hasAllFeatures, loadScript } from './utils.js'
import { main } from './main.js'

if (hasAllFeatures()) {
  // Browsers that support all features run `main()` immediately.
  main();
} else {
  // All other browsers loads polyfills and then run `main()`.
  loadScript('https://polyfill.io/v3/polyfill.min.js?features=fetch%2Ces6') //TODO: check if all es6 is needed in IE11 or just .findIndex would do
  .then(() => loadScript('https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-loader.js'))
  // .then(() => loadScript('/scripts/polyfills/adoptedStyleSheets.js')) //TODO: check if this polyfill works at all
  .then(() => main())
  .catch((err) => main(err))
}
