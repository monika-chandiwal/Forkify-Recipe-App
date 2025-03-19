import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
import receipeView from './views/receipeView.js';
if (module.hot) {
  module.hot.accept();
}
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    console.log('model', API_URL, id);
    const data = await getJSON(`${API_URL}/${id}`);
    console.log('df');
    console.log(data);
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

export const loadSearchResults = async function (query) {
  try {
    console.log(query);
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    console.log('search data : ', data);
    console.log('search  state : ', state.search);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
    return state.search.results;
  } catch (err) {
    receipeView.renderError(err);
  }
};
