import React, { useState, useReducer } from "react";
import axios from "axios";

const Form = ({ recipes, setRecipes }) => {
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

export default Form;
