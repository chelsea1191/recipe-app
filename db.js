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
  INSERT INTO recipes (title, instructions) VALUES ('bettys banana bread', 'combine all dry ingredients, combine all wet ingredients, combine together and bake at 350 degrees for 25 minutes');
  INSERT INTO recipes (title, instructions) VALUES ('hazels sausage balls', 'combine together and bake at 350 degrees for 17 minutes');
  INSERT INTO ingredients(recipe_id, text) VALUES (2, 'cream cheese');
  INSERT INTO ingredients(recipe_id, text) VALUES (2, 'yeast');
  INSERT INTO ingredients(text) VALUES ('margarine');
  INSERT INTO ingredients(text) VALUES ('sugar');
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
