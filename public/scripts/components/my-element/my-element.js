(function() {
  const template = document.createElement('template');
  var css = new CSSStyleSheet()
  css.replace( "@import url('/scripts/components/my-element/my-element.css')" )

  template.innerHTML = `
    <div class="app__content__host">
      <slot name="name"></slot>
      <slot name="appList"></slot>
    </div>

    <div>
      <button type="button" increment>+</button>
      <span></span>
      <button type="button" decrement>-</button>
    </div>
  `;

  class MyElement extends HTMLElement {
    constructor() {
      super();

      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.adoptedStyleSheets = [css];

      this.incrementBtn = this.shadowRoot.querySelector('[increment]');
      this.decrementBtn = this.shadowRoot.querySelector('[decrement]');
    }

    connectedCallback() {
      this.incrementBtn.addEventListener('click', this.increment);
      this.decrementBtn.addEventListener('click', this.decrement);

      if (!this.hasAttribute('value')) {
        this.setAttribute('value', 1);
      }
    }

    increment() {
      // using +myVariable coerces myVariable into a number,
      // we do this because the attribute's value is received as a string
      const step = +this.step || 1;
      const newValue = +this.value + step;

      if (this.max) {
        this.value = newValue > +this.max ? +this.max : +newValue;
      } else {
        this.value = +newValue;
      }
    }

    decrement() {
      const step = +this.step || 1;
      const newValue = +this.value - step;

      if (this.min) {
        this.value = newValue <= +this.min ? +this.min : +newValue;
      } else {
        this.value = +newValue;
      }
    }

    static get observedAttributes() {
      return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.hostName = newValue;
    }

    get value() {
      return this.getAttribute('value');
    }

    get step() {
      return this.getAttribute('step');
    }

    get min() {
      return this.getAttribute('min');
    }

    get max() {
      return this.getAttribute('max');
    }

    get hostName() {
      return this.getAttribute('name')
    }

    set hostName(newValue) {
      this.setAttribute('name', newValue);
    }

    set value(newValue) {
      this.setAttribute('value', newValue);
    }

    set step(newValue) {
      this.setAttribute('step', newValue);
    }

    set min(newValue) {
      this.setAttribute('min', newValue);
    }

    set max(newValue) {
      this.setAttribute('max', newValue);
    }

    disconnectedCallback() {
      this.incrementBtn.removeEventListener('click', this.increment);
      this.decrementBtn.removeEventListener('click', this.decrement);
    }
  }

  window.customElements.define('my-element', MyElement);
})();