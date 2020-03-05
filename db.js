const pg = require("pg");
const { Client } = pg;
const uuid = require("uuid/v4");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/recipes"
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS recipes;
  CREATE TABLE recipes
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_create DATE NOT NULL default CURRENT_DATE,
    title VARCHAR(100) NOT NULL,
    ingredients VARCHAR(400) NOT NULL,
    instructions VARCHAR NOT NULL,
    CHECK (char_length(title) > 0)
  );
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('bettys banana bread', 'eggs, bananas, flour, butter', 'combine all dry ingredients, combine all wet ingredients, combine together and bake at 350 degrees for 25 minutes');
  INSERT INTO recipes (title, ingredients, instructions) VALUES ('hazels sausage balls', 'cheddar cheese, biscuit mix, ground sausage', 'combine together and bake at 350 degrees for 17 minutes');
  `;
  await client.query(SQL);
};

//////////////////get///////////////////
const readRecipes = async () => {
  const SQL = `SELECT * FROM recipes;`;
  const response = await client.query(SQL);
  return response.rows;
};

//////////////////post///////////////////
const createRecipe = async ({ title, ingredients, instructions }) => {
  const SQL = `INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) returning *;`;
  const response = await client.query(SQL, [title, ingredients, instructions]);
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
  createRecipe,
  deleteRecipe
  //updateRecipe
};
