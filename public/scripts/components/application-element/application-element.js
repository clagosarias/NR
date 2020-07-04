'use strict'
import UI from '../../ui.js';

(function() {
  const template = document.createElement('template');

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
    }

    connectedCallback() {
      this.nameBtn.addEventListener('click', this.openModal);
    }

    openModal() {
      UI.openModal(this.version);
    }

    get version() {
      return this.getAttribute('release')
    }
  }

  window.customElements.define('application-element', ApplicationElement);
})();