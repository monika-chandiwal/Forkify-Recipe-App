import View from './views';
import icons from 'url:../../img/icons.svg';
import Preview from './preview.js';
class ResultsView extends View {
  _errorMsg = 'No recipes found for your query! Please try again :)';
  _msg = '';
  _data;
  _parentElement = document.querySelector('.results');
  _generateMerkup() {
    console.log(this._data);
    return this._data.map(result => Preview.render(result, false)).join('');
  }
}
export default new ResultsView();
