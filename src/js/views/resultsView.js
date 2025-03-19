import View from './views';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _errorMsg = 'No recipes found for your query! Please try again :)';
  _msg = '';
  _data;
  _parentElement = document.querySelector('.results');
  _generateMerkup() {
    console.log(this._data);
    return this._data.map(this._generateMerkupPreviw).join('');
  }
  _generateMerkupPreviw(result) {
    return `<li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        
      </div>
    </a>
  </li>`;
  }
}
export default new ResultsView();
