import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';
import receipeView from './views/receipeView.js';
import bookmarkView from './views/bookmarkView.js';
if (module.hot) {
  module.hot.accept();
}
export const state = {
  recipe: {
    bookmarked: false,
  },
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmark: [],
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
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log('search  state : ', state.search);
    // console.log(state.search.results);
    return state.search.results;
  } catch (err) {
    receipeView.renderError(err);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  //console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
export const addBookmarks = function (recipe) {
  //addBookmark
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  console.log(state.bookmark);
  setLocalStorage();
};
export const removeBookmarks = function (id) {
  //removeBookmark
  const idx = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(idx, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  console.log(state.bookmark);
  setLocalStorage();
};

const setLocalStorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};
const init = function () {
  try {
    const data = localStorage.getItem('bookmark');
    if (!data) return;
    state.bookmark = JSON.parse(data) || [];
    bookmarkView.update(state.bookmark);
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
};
init();
console.log(state.bookmark);

const clearBookmarks = function () {
  localStorage.clear('bookmark');
};
//clearBookmarks();
