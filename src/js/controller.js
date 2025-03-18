import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import receipeView from './views/receipeView.js';

//console.log(icons);

// console.log(recipeContainer);
//console.log('TEST data demo');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(0);
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

const init = function () {
  receipeView.addHandlerRender(controlRecipes);
};
init();
