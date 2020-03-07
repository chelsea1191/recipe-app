import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//TODO: separate into component files (form and list to start with)

const Form = (setRecipes, recipes) => {
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
    console.log("front end in submit function:", userInput);
    axios
      .post("/api/recipes", { userInput })
      .then(response => setRecipes([response.data, ...recipes]));
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
      <input type="submit" value="submit" />
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
    <div>
      <div>
        <ul>
          <div>
            {recipes.map(recipe => {
              return (
                <li key={recipe.id}>
                  <span>{recipe.title}</span> <br />
                  <span>ingredients: {recipe.ingredients}</span> <br />
                  <span>instructions: {recipe.instructions}</span> <br />
                  <button onClick={() => destroy(recipe.id)}>Delete</button>
                </li>
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
  // const [title, setTitle] = useState("");
  // const [ingredients, setIngredients] = useState("");
  // const [instructions, setInstructions] = useState("");

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

// return (
//   <div className="App">
//     <h1>Recipe App</h1>
//     <div>
//       <div className="form">
//         <form onSubmit={create}>
//           <input
//             type="text"
//             value={title}
//             placeholder="recipe title"
//             onChange={ev => setTitle(ev.target.value)}
//           />
//           <button className="button" disabled={!text}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//     <div>
//       <List recipes={recipes} destroy={destroy} />
//     </div>
//   </div>
// );
