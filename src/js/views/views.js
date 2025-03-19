import icons from 'url:../../img/icons.svg';
export default class Views {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }
  render(data) {
    console.log('render data : ', data);
    if (!data || data.length == 0) return this.renderError();
    //console.log('inside render', data);
    this._data = data;
    const markup = this._generateMerkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
