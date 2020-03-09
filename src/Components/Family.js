import React from "react";
import axios from "axios";

const Family = ({ recipes, setRecipes }) => {
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

export default Family;
