import React from "react";

const Rating = ({ edit, recipe }) => {
  if (recipe.rating === null) {
    return (
      <div>
        <label htmlFor="rating">Set User Rating:</label>
        <select id="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onClick={e => edit(e, recipe)}>Rate this recipe!</button>
      </div>
    );
  } else {
    return (
      <div>
        <span className="ingredient_title">Recipe rating: {recipe.rating}</span>
      </div>
    );
  }
};

export default Rating;
