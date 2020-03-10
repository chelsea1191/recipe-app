import React from "react";
import axios from "axios";
import Form from "./Form.js";
import shortid from "shortid";
import Rating from "./Rating.js";

const Family = ({ recipes, setRecipes }) => {
  const destroy = id => {
    axios
      .delete(`/api/recipes/${id}`)
      .then(response => response.data)
      .then(() => {
        setRecipes(recipes.filter(n => n.id !== id));
      });
  };
  const edit = async (e, recipe) => {
    let rating = e.target.previousElementSibling.value;
    let id = recipe.id;
    await axios.put(`/api/recipes`, { id, rating }).then(response => {
      setRecipes([
        ...recipes.filter(recipe => recipe.id !== id),
        response.data
      ]);
    });
  };
  const convertToArray = input => {
    const converted = input.split(",");
    return (
      <div>
        {converted.map(each => {
          return <li key={shortid.generate()}>{each}</li>;
        })}
      </div>
    );
  };
  return (
    <div>
      <Form recipes={recipes} setRecipes={setRecipes} />
      <div className="container">
        {recipes.map(recipe => {
          return (
            <div className="jumbotron" key={recipe.id} id="card">
              <div className="inline">
                <img className="img-thumbnail" src="./assets/icon.png" />
                <h1> {recipe.title}</h1>
              </div>
              <div>
                <span className="title">ingredients:</span>
                <span>{convertToArray(recipe.ingredients)}</span>
              </div>
              <div>
                <span className="title">instructions: </span>
                <span>{recipe.instructions}</span>
              </div>
              <Rating edit={edit} recipe={recipe} />
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
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button
                    type="submit"
                    value="delete"
                    className="dropdown-item"
                    onClick={() => destroy(recipe.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Family;
