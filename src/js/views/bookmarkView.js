import View from './views';
import icons from 'url:../../img/icons.svg';
import Preview from './preview';
class BookmarkView extends View {
  _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _msg = '';
  _data;
  _parentElement = document.querySelector('.bookmarks__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMerkup() {
    console.log(this._data);
    return this._data.map(bookmark => Preview.render(bookmark, false)).join('');
  }
}
export default new BookmarkView();
