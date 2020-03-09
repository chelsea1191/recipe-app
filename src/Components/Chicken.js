import React from "react";

const Chicken = ({ chicken }) => {
  return (
    <div>
      {chicken.map(each => {
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

export default Chicken;
