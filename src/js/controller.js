import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
//console.log(icons);

// console.log(recipeContainer);
//console.log('TEST data demo');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    receipeView.renderSpinner();
    console.log(id);
    //.1 loading recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    receipeView.render(model.state.recipe);
  } catch (err) {
    receipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    model.state.search.results = await model.loadSearchResults(query);
    console.log(model.state.search.results);

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  receipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
