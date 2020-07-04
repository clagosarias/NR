(function() {
  const container = document.createElement("div");
  container.innerHTML = `
    <style>
      .wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
        z-index: 1;
      }
      .visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
      }
      .modal {
        font-family: Helvetica;
        font-size: 14px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
        min-width: 120px;
        text-align: center;
      }
      .version {
        text-align: center;
        font-size: 20px;
        margin: 12px 0;
        padding: 10px;
        display: block;
      }
      .button-container {
        overflow: hidden;
        border-radius: 2px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
      button {
        background-color: var(--secondary-text);
        border: 1px solid var(--secondary-text);
        color: white;
        cursor: pointer;
        width: 100%;
        padding: 10px;
        font-size: 16px;
      }
      button:hover {
        background-color: #6c757d;
        border-color: #6c757d;
      }
    </style>
    <div class='wrapper'>
      <div class='modal'>
        <span class='version'></span>
        <div class='button-container'>
          <button class='ok'>Okay</button>
        </div>
      </div>
    </div>`;

  class Modal extends HTMLElement {
    get visible() {
      return this.hasAttribute("visible");
    }

    open(version) {
      this.version = version
      this.setAttribute("visible", "");
    }

    set version(value) {
      this.setAttribute('version', value);
    }

    get version() {
      return this.getAttribute('version');
    }

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(container);
    }

    connectedCallback() {
      this._attachEventHandlers();
    }

    static get observedAttributes() {
      return ["visible", "version"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "version" && this.shadowRoot) {
        this.shadowRoot.querySelector(".version").textContent = newValue;
      }
      if (name === "visible" && this.shadowRoot) {
        if (newValue === null) {
          this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
        } else {
          this.shadowRoot.querySelector(".wrapper").classList.add("visible");
        }
      }
    }

    _attachEventHandlers() {
      const okButton = this.shadowRoot.querySelector(".ok");
      okButton.addEventListener('click', () => {
        this.removeAttribute("visible");
      });
    }
  }

  window.customElements.define('app-modal', Modal);
})();