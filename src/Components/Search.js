import React, { useEffect } from "react";
import shortid from "shortid";

const Search = ({
  getSearch,
  updateSearch,
  search,
  query,
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
      <form className="form" onSubmit={getSearch}>
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={updateSearch}
          aria-describedby="emailHelp"
        />

        <small id="emailHelp" className="form-text text-muted">
          Search Edamam API for recipes here
        </small>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <div className="container">
        {searched.map(each => {
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
    </div>
  );
};

export default Search;
