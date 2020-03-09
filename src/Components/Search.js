import React, { useEffect } from "react";
import shortid from "shortid";

const Search = ({
  getSearch,
  updateSearch,
  search,
  query,
  setSearch,
  setQuery,
  setSearched,
  searched,
  APP_ID,
  APP_KEY
}) => {
  const getSearchedRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setSearched(data.hits);
  };

  useEffect(() => {
    getSearchedRecipes();
  }, [query]);

  return (
    <div>
      <form className="form-inline" onSubmit={getSearch}>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={updateSearch}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <div className="container-fluid">
        {searched.map(each => {
          return (
            <div className="card" key={each.recipe.calories}>
              <div className="card_title">
                <img className="img-thumbnail" src={each.recipe.image} />
                <span className="recipe_title">{each.recipe.label}</span>
              </div>
              <ul>
                <span className="ingredient_title">ingredients:</span>
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
    </div>
  );
};

export default Search;
