import React, { useState, useEffect } from "react";
import axios from "axios";
import Family from "./Components/Family.js";
import Chicken from "./Components/Chicken.js";
import Beef from "./Components/Beef.js";
import Veggie from "./Components/Veggie.js";
import Home from "./Components/Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    console.log(data.hits[0]);
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
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <li className="nav-link active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/family">Family</Link>
            </li>
            <li className="nav-link">
              <Link to="/chicken">Chicken</Link>
            </li>
            <li className="nav-link">
              <Link to="/beef">Beef</Link>
            </li>
            <li className="nav-link">
              <Link to="/veggie">Veggie</Link>
            </li>
          </nav>
          <Switch>
            <Route path="/family">
              <Family recipes={recipes} setRecipes={setRecipes} />
            </Route>
            <Route path="/chicken">
              <Chicken chicken={chicken} />
            </Route>
            <Route path="/beef">
              <Beef beef={beef} />
            </Route>
            <Route path="/veggie">
              <Veggie veggie={veggie} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="container"></div>
      <div className="media">
        <img className="img-thumbnail" src="./assets/me.jpg" />
        <p className="mt-0">developed by: chelsea</p>
      </div>
    </div>
  );
};

export default App;
