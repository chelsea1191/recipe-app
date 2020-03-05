import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Form = ({ create }) => {
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

  ////////createRecipe ========= onSubmit={createRecipe}

  return (
    <form>
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

const List = ({ recipes, destroy }) => {
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
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

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
        <Form create={create} />
      </div>
      <div>
        <List destroy={destroy} recipes={recipes} />
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
