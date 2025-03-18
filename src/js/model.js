import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
import receipeView from './views/receipeView.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    //console.log(res, data);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };
    console.log(state.recipe);
  } catch (err) {
    receipeView.renderError(err);
  }
};
