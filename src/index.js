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
    <div className="container">
      <form onSubmit={createRecipe}>
        <label>Recipe Title</label>
        <input
          type="text"
          value={userInput.title}
          onChange={onChange("title")}
        />
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
        <br />
        <input
          type="submit"
          className="btn btn-outline-success"
          value="create new recipe"
        />
      </form>
    </div>
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
      <ul>
        {recipes.map(recipe => {
          return (
            <div>
              <div key={recipe.id} className="card">
                <div className="card_title">
                  <span className="recipe_title">{recipe.title}</span>
                </div>
                <div>
                  <span className="ingredient_title">ingredients:</span>
                  <span>{recipe.ingredients}</span>
                </div>
                <div>
                  <span className="instruction_title">instructions: </span>
                  <span>{recipe.instructions}</span>
                </div>

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      type="submit"
                      value="delete"
                      className="dropdown-item"
                      onClick={() => destroy(recipe.id)}
                    >
                      delete
                    </button>
                    <button type="submit" value="edit" class="dropdown-item">
                      edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
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
      <div className="container">
        <div>
          <Form recipes={recipes} setRecipes={setRecipes} />
        </div>
        <div>
          <List recipes={recipes} setRecipes={setRecipes} />
        </div>
      </div>
      <div className="media">
        <img className="img-thumbnail" src="./assets/me.jpg" />
        <div className="media-body">
          <h5 className="mt-0">Developed by: Chelsea Kramer</h5>
          <p>Student at UNF Coding Bootcamp</p>
        </div>
      </div>
    </div>
  );
};

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
