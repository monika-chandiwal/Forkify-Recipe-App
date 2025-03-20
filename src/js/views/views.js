import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
export default class Views {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }
  render(data, render = true) {
    console.log('render data : ', data);
    if (!data || data.length == 0) return this.renderError();
    //console.log('inside render', data);
    this._data = data;
    const markup = this._generateMerkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    // console.log('in update method ');
    // if (!data || data.length === 0) return this.renderError();

    this._data = data;
    const newMarkup = this._generateMerkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const curEle = Array.from(this._parentElement.querySelectorAll('*'));
    const newEle = Array.from(newDOM.querySelectorAll('*'));
    //console.log(newDOM);
    newEle.forEach((newEl, i) => {
      const curEl = curEle[i];
      //console.log(curEl, newEl.isEqualNode(curEl));
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(
        //   'newEl.firstChild.nodeValue : ',
        //   newEl.firstChild?.nodeValue.trim()
        // );
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(at =>
          curEl.setAttribute(at.name, at.value)
        );
      }
    });
  }
  renderSpinner() {
    console.log('this_parantElemtn ', this._parentElement);
    const markup = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = `${this._errorMsg}`) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = `${this._msg}`) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
