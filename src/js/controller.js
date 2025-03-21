import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; //Ensures compatibility with older browsers.
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
//console.log(icons);

// console.log(recipeContainer);
//console.log('TEST data demo');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    receipeView.renderSpinner();
    //console.log(id);
    //update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage()); // Update search results view
    bookmarkView.update(model.state.bookmark); // Update bookmark view
    //.1 loading recipe
    await model.loadRecipe(id); // Load recipe data from API

    // 2. rendering recipe
    receipeView.render(model.state.recipe);
    //receipeView.update(model.state.recipe);
    console.log('model.state.bookmark : ', model.state.bookmark);
  } catch (err) {
    receipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    model.state.search.page = 1;
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    model.state.search.results = await model.loadSearchResults(query);
    //console.log(model.getSearchResultsPage(1));
    //console.log(model.state.search.results);

    resultsView.render(model.getSearchResultsPage(model.state.search.page));
    paginationView.render(model.state.search);
    //resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log('pagination');
  model.state.search.page = goToPage;
  //renderNew result
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  ///render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (ser) {
  model.updateServings(ser);
  console.log('controlservings');
  //receipeView.render(model.state.recipe);
  receipeView.update(model.state.recipe);
};
const controlBookmarks = function () {
  if (model.state.recipe.bookmarked)
    model.removeBookmarks(model.state.recipe.id);
  else model.addBookmarks(model.state.recipe);
  console.log(model.state.recipe);
  receipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmark);
};
const controlBookmarksHandler = function () {
  bookmarkView.render(model.state.bookmark);
};
const controlAddRecipeHandler = async function (newRec) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRec);
    receipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmark);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 3000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  window.location.hash = '';
  bookmarkView.addHandlerRender(controlBookmarksHandler);

  receipeView.addHandlerRender(controlRecipes);
  receipeView.addHandlerUpdateServings(controlServings);
  receipeView.addhandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addhandlerUpload(controlAddRecipeHandler);
};
init();
