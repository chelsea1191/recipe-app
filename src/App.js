import React, { useState, useEffect } from "react";
import axios from "axios";

const List = ({ recipes, destroy }) => {
  return (
    <div>
      <div>
        <ul>
          {recipes.map(recipe => {
            return (
              <li key={recipe.id}>
                <span>{recipe.title}</span>
                <button onClick={() => destroy(recipe.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, SetIngredients] = useState("");
  const [instructions, SetInstructions] = useState("");

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(ex => console.log(ex.response.data));
  }, []);

  const create = ev => {
    ev.preventDefault();
    axios
      .post("/api/recipes", { title, ingredients, instructions })
      .then(response => setRecipes([response.data, ...todos]));
  };

  const destroy = id => {
    axios
      .delete(`/api/recipes/${id}`)
      .then(response => response.data)
      .then(() => {
        setRecipes(todos.filter(n => n.id !== id));
      });
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <div>
        <div className="form">
          <form onSubmit={create}>
            <input
              type="text"
              value={title}
              placeholder="recipe title"
              onChange={ev => setTitle(ev.target.value)}
            />
            <button className="button" disabled={!text}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <List recipes={recipes} destroy={destroy} />
      </div>
    </div>
  );
};

export default App;
