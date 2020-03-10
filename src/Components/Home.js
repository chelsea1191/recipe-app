import React from "react";

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Hello, recipe seeker!</h1>
      <p className="lead">
        This is a simple database to store and view recipes. Please click on one
        of the links above to begin.
      </p>
      <hr className="my-4" />
      <p className="lead">
        All of the recipes (besides those listed under the Family tab) are
        pulled from the Edamam API{" "}
      </p>
      <img className="img-thumbnail lead" src="./assets/edamam.jpg" />
      <a
        className="btn btn-secondary lead"
        href="https://developer.edamam.com/edamam-docs-recipe-api"
        target="_blank"
        role="button"
      >
        Learn more about the Edamam API
      </a>
    </div>
  );
};

export default Home;
