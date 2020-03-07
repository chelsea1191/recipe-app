import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//TODO: separate into component files (form and list to start with)

const Form = ({ setRecipes, recipes }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      ingredients: "",
      instructions: ""
    }
  );

  const onChange = key => ev => {
    const newValue = ev.target.value;
    setUserInput({ [key]: newValue });
  };

  const createRecipe = ev => {
    ev.preventDefault();
    axios
      .post("/api/recipes", { userInput })
      .then(response => setRecipes([...recipes, response.data]));
  };

  return (
    <form onSubmit={createRecipe}>
      <br />
      <label>Recipe Title</label>
      <input type="text" value={userInput.title} onChange={onChange("title")} />
      <br />
      <label>Ingredients</label>
      <input
        type="text"
        value={userInput.ingredients}
        onChange={onChange("ingredients")}
      />
      <br />
      <label>Instructions</label>
      <input
        type="text"
        value={userInput.instructions}
        onChange={onChange("instructions")}
      />
      <input type="submit" value="create new recipe" />
    </form>
  );
};

const List = ({ recipes, setRecipes }) => {
  const destroy = id => {
    axios
      .delete(`/api/recipes/${id}`)
      .then(response => response.data)
      .then(() => {
        setRecipes(recipes.filter(n => n.id !== id));
      });
  };
  return (
    <div className="container">
      <div>
        <ul>
          <div>
            {recipes.map(recipe => {
              return (
                <div>
                  <div key={recipe.id} className="card">
                    <div className="card_title">
                      <span className="text_title">{recipe.title}</span>
                    </div>
                    <div>ingredients: {recipe.ingredients}</div>
                    <div>instructions: {recipe.instructions}</div>
                  </div>
                  <button onClick={() => destroy(recipe.id)}>delete</button>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(ex => console.log(ex.response.data));
  }, []);

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <div>
        <Form recipes={recipes} setRecipes={setRecipes} />
      </div>
      <div>
        <List recipes={recipes} setRecipes={setRecipes} />
      </div>
    </div>
  );
};

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
