(function() {
  const template = document.createElement('template');
  // var css = new CSSStyleSheet()
  // css.replace( "@import url('/scripts/components/application-element/application-element.css')" )

  template.innerHTML = `
  <style>
    .host__list__application {
      display: flex;
    }
  </style>

  <li class="host__list__application">
    <slot name="appApdex"></slot>
    <slot name="appName" openModal></slot>
  </li>
  `;

  class ApplicationElement extends HTMLElement {
    constructor() {
      super();
      this.openModal = this.openModal.bind(this);

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.nameBtn = this.shadowRoot.querySelector('[openModal]');
      // this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback() {
      this.nameBtn.addEventListener('click', this.openModal);
    }

    openModal() {
      console.log(this.version)
    }

    get version() {
      return this.getAttribute('release')
    }
  }

  window.customElements.define('application-element', ApplicationElement);
})();