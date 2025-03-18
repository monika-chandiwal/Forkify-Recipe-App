import { async } from 'regenerator-runtime';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`);

  // const res = await fetch(
  //   'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
  // );
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
};
