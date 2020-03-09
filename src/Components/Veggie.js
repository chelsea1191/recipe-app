import React from "react";
import shortid from "shortid";

const Veggie = ({ veggie }) => {
  return (
    <div className="container">
      {veggie.map(each => {
        return (
          <div className="jumbotron" id="card" key={each.recipe.calories}>
            <div className="inline">
              <img className="img-thumbnail-lg" src={each.recipe.image} />
              <h1>{each.recipe.label}</h1>
            </div>
            <ul>
              <span className="title">ingredients:</span>
              {each.recipe.ingredientLines.map(ing => {
                return <li key={shortid.generate()}>{ing}</li>;
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

export default Veggie;
