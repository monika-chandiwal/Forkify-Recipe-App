import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helper';
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

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    console.log('model', API_URL, id);
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    console.log(data);

    state.recipe = createRecipeObject(data);
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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    console.log('search data : ', data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
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

export const uploadRecipe = async function (newRec) {
  try {
    console.log(Object.entries(newRec));
    const ingredients = Object.entries(newRec)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const arrIng = ing[1].split(',').map(el => el.trim());
        if (arrIng.length !== 3)
          throw new Error(
            'Wrong ingredients format ! please use the correct format :) '
          );
        const [quantity, unit, description] = arrIng;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
    const recipe = {
      title: newRec.title,
      publisher: newRec.publisher,
      cooking_time: +newRec.cookingTime,
      image_url: newRec.image,

      servings: +newRec.servings,
      source_url: newRec.sourceUrl,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmarks(state.recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};
