const pg = require("pg");
const { Client } = pg;
const uuid = require("uuid/v4");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/recipes2"
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS ingredients;
  DROP TABLE IF EXISTS recipes;
  CREATE TABLE recipes
  (
    id serial PRIMARY KEY,
    title VARCHAR(255),
    ingredients VARCHAR,
    instructions VARCHAR,
    CHECK (char_length(title) > 0)
  );
   CREATE TABLE ingredients
  (
    id serial PRIMARY KEY,
    recipe_id INTEGER,
    text VARCHAR,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  );
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('bettys banana bread', '1 1/4 cup sugar, 1/2 cup shortening, 2 egg yolks, 3 ripe bananas, 2 cups flour, 1/2 teaspoon salt, 1 teaspoon baking soda', 'combine flour, salt, sugar, and baking soda, combine all wet ingredients, combine together and bake at 300 degrees for 60 minutes');
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('bettys sausage balls', '2 cups biscuit mix, 1 pound ground spicy sausage, 8 oz shredded cheddar cheese', 'combine together and bake at 400 degrees for 15 minutes');
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('banana pudding', '1/2 cup sugar, 1/3 cup flour, 1/8 teaspoon salt, 2 cups milk, 1 teaspoon vanilla extract, 2 tablespoons butter, 2 eggs well beaten', 'mix sugar, flour, and salt. add milk slowly then heat and add butter and vanilla extract');
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('sour cream pound cake', '1 cup softened butter, 2 3/4 cups sugar, 6 eggs, 3 cups sifted flour, 1/2 teaspoon salt, 1/4 teaspoon baking soda, 1 cup sour cream, 1 teaspoon vanilla extract', 'cream butter and sugar until light peaks are formed, add eggs one at a time beating thoroughly after each. Sift dry ingredients 3 times and add alternately with sour cream to sugar and egg mixture until smooth. add flavoring. pour into tube pan lined on the bottom with parchment paper. bake 350 degrees for 60-80 minutes until done');
  `;
  await client.query(SQL);
};

//////////////////get///////////////////
const readRecipes = async () => {
  const SQL = `SELECT * FROM recipes;`;
  const response = await client.query(SQL);
  return response.rows;
};
const readIngredients = async () => {
  const SQL = `SELECT * FROM ingredients;`;
  const response = await client.query(SQL);
  return response.rows;
};

//////////////////post///////////////////
const createRecipe = async ({ userInput }) => {
  const SQL = `INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) returning *;`;
  const response = await client.query(SQL, [
    userInput.title,
    userInput.ingredients,
    userInput.instructions
  ]);
  return response.rows[0];
};
const createIngredients = async ({ userInput }) => {
  const SQL = `INSERT INTO ingredients (recipe_id, text) VALUES ($1, $2) returning *;`;
  const response = await client.query(SQL, [
    userInput.recipe_id,
    userInput.ingredients
  ]);

  return response.rows[0];
};

//////////////////delete///////////////////
const deleteRecipe = async id => {
  const SQL = `DELETE FROM recipes WHERE (id) = ($1);`;
  await client.query(SQL, [id]);
};

///////////////////put/////////////////////
// const updateRecipe = async id => {
//   const SQL = `UPDATE recipes SET completed = NOT completed WHERE id = $1`;
//   await client.query(SQL, [id]);
// };

module.exports = {
  sync,
  readRecipes,
  readIngredients,
  createRecipe,
  createIngredients,
  deleteRecipe
  //updateRecipe
};
