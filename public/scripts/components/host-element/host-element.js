(function() {
  const template = document.createElement('template');
  // var css = new CSSStyleSheet()
  // css.replace( "@import url('/scripts/components/host-element/host-element.css')" )

  template.innerHTML = `
    <div class="app__content__host">
      <slot name="name"></slot>
      <slot name="appList"></slot>
    </div>
  `;

  class HostElement extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      // this.shadowRoot.adoptedStyleSheets = [css];
    }
  }

  window.customElements.define('host-element', HostElement);
})();