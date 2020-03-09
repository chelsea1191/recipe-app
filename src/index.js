import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Family from "./Components/Family.js";
import Chicken from "./Components/Chicken.js";
import Beef from "./Components/Beef.js";
import Veggie from "./Components/Veggie.js";
import Form from "./Components/Form.js";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [chicken, setChicken] = useState([]);
  const [beef, setBeef] = useState([]);
  const [veggie, setVeggie] = useState([]);
  const APP_ID = "2224879b";
  const APP_KEY = "645ea4ee77c571427c20ed96020a75bf";

  const getChickenRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setChicken(data.hits);
    //console.log(data.hits[0]);
  };
  const getBeefRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=beef&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setBeef(data.hits);
  };
  const getVeggieRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=veggie&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setVeggie(data.hits);
  };
  useEffect(() => {
    getChickenRecipes();
    getBeefRecipes();
    getVeggieRecipes();
  }, []);
  useEffect(() => {
    axios
      .get("/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(ex => console.log(ex.response.data));
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Home
        </a>
      </nav>
      <div className="container">
        <div>
          <Form recipes={recipes} setRecipes={setRecipes} />
        </div>
        <div>
          <Family recipes={recipes} setRecipes={setRecipes} />
        </div>
        <div>
          <Chicken chicken={chicken} />
        </div>
        <div>
          <Beef beef={beef} />
        </div>
        <div>
          <Veggie veggie={veggie} />
        </div>
      </div>
      <div className="media">
        <img className="img-thumbnail" src="./assets/me.jpg" />
        <p className="mt-0">Developed by: Chelsea Kramer</p>
      </div>
    </div>
  );
};

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
