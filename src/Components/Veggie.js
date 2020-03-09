import React from "react";

const Veggie = ({ veggie }) => {
  return (
    <div>
      {veggie.map(each => {
        return (
          <div key={each.recipe.calories}>
            <p>{each.recipe.label}</p>
            <a href={each.recipe.url}>URL</a>
            <img src={each.recipe.image} />
          </div>
        );
      })}
    </div>
  );
};

export default Veggie;
