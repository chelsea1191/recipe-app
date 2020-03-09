import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//TODO: separate into component files (form and list to start with)

const Form = ({ setRecipes, recipes, ingredients, setIngredients }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      ingredients: "",
      instructions: ""
    }
  );

  const onChange = key => ev => {
    var newValue = ev.target.value;
    setUserInput({ [key]: newValue });
  };

  const createRecipe = ev => {
    console.log("from front end:", userInput);
    ev.preventDefault();
    axios
      .post("/api/recipes", { userInput })
      .then(response => setRecipes([...recipes, response.data]));
    // axios
    //   .post("/api/ingredients", { userInput })
    //   .then(
    //     axios
    //       .get("/api/ingredients")
    //       .then(response => console.log(response.data))
    //   );
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

const List = ({ recipes, setRecipes, ingredients, setIngredients }) => {
  const destroy = id => {
    axios
      .delete(`/api/recipes/${id}`)
      .then(response => response.data)
      .then(() => {
        setRecipes(recipes.filter(n => n.id !== id));
      });
  };
  const edit = userInput => {
    console.log(userInput);
  };
  return (
    <div className="container">
      <ul>
        {recipes.map(recipe => {
          return (
            <div key={recipe.id}>
              <div className="card">
                <div className="card_title">
                  <img className="img-thumbnail" src="./assets/icon.png" />
                  <span className="recipe_title"> {recipe.title}</span>
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
                    <button
                      type="submit"
                      value="edit"
                      className="dropdown-item"
                      onClick={() => edit("clicked edit")}
                    >
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
// <span>
//   {ingredients
//     .filter(ing => ing.recipe_id === recipe.id)
//     .map(ing => {
//       console.log(ing);
//       return <span key={ing.id}> {ing.text}, </span>;
//     })}
// </span>;

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(ex => console.log(ex.response.data));
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("/api/ingredients")
  //     .then(response => setIngredients(response.data))
  //     .catch(ex => console.log(ex.response.data));
  // }, []);

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <div className="container">
        <div>
          <Form
            ingredients={ingredients}
            setIngredients={setIngredients}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </div>
        <div>
          <List
            ingredients={ingredients}
            setIngredients={setIngredients}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </div>
      </div>
      <div className="media">
        <img className="img-thumbnail" src="./assets/me.jpg" />
        <p className="mt-0">Developed by: Chelsea Kramer</p>
      </div>
    </div>
  );
};

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
