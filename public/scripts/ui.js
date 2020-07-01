export default class UI {
  constructor(checkboxInput, appContent) {
    this._checkboxInput = document.querySelector(checkboxInput);
    this._appContent = document.querySelector(appContent);
  }

  addCheckboxListener() {
    this._checkboxInput.addEventListener('change', (e) => {
      e.target.checked ? this.changeContentList() : this.changeContentGrid();
    }, false);
  }

  changeContentList() {
    this._appContent.classList.add('list')
  }

  changeContentGrid() {
    this._appContent.classList.remove('list')
  }
}