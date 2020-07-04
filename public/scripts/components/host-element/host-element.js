(function() {
  const template = document.createElement('template');

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
    }
  }

  window.customElements.define('host-element', HostElement);
})();