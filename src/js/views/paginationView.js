import View from './views';
import icons from 'url:../../img/icons.svg';
import { nextPageButton, prevPageButton } from '../config';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      //console.log(btn);
      const goToPage = +btn.dataset.goto;
      console.log('go to Page : ', goToPage);
      handler(goToPage);
    });
  }
  _generateMerkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log('total Page : ', numPage);
    if (this._data.page === 1 && numPage > 1) return this.nextPage();
    else if (this._data.page === numPage && numPage > 1) return this.prePage();
    else if (this._data.page > 1 && this._data.page < numPage)
      return `${this.prePage() + this.nextPage()} `;
  }
  nextPage() {
    return `
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  prePage() {
    return `<button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
  }
}
export default new PaginationView();
