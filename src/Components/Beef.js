import React from "react";

const Beef = ({ beef }) => {
  return (
    <div className="container">
      {beef.map(each => {
        return (
          <div className="card" key={each.recipe.calories}>
            <div className="card_title">
              <img className="img-thumbnail" src={each.recipe.image} />
              <span className="recipe_title">{each.recipe.label}</span>
            </div>
            <ul>
              <span className="ingredient_title">ingredients:</span>
              {each.recipe.ingredientLines.map(ing => {
                return <li>{ing}</li>;
              })}
            </ul>
            <a href={each.recipe.url} target="_blank">
              Link to Recipe: {each.recipe.source}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Beef;
