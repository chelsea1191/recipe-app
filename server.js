const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));
const morgan = require("morgan");

app.use("/dist", express.static(path.join(__dirname, "dist")));

//////////////////use///////////////////
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//////////////////get////////////////////
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/recipes", async (req, res, next) => {
  await db
    .readRecipes()
    .then(recipes => res.send(recipes))
    .catch(next);
});
app.get("/api/ingredients", async (req, res, next) => {
  await db
    .readIngredients()
    .then(ing => res.send(ing))
    .catch(next);
});

//////////////////post////////////////////
app.post("/api/recipes", (req, res, next) => {
  db.createRecipe(req.body)
    .then(recipe => res.send(recipe))
    .catch(next);
});
app.post("/api/ingredients", (req, res, next) => {
  //console.log("server side: ", req.body);
  db.createIngredients(req.body)
    .then(ing => res.send(ing))
    .catch(next);
});

//////////////////delete////////////////////
app.delete("/api/recipes/:id", (req, res, next) => {
  db.deleteRecipe(req.params.id)
    .then(() => res.sendStatus(204)) //since no return
    .catch(next);
});

//////////////////put//////////////////////
app.put("/api/recipes/", (req, res, next) => {
  db.updateRecipe(req.body.id, req.body.rating)
    .then(recipes => res.send(recipes))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    console.log("db synced");
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(ex => console.log(ex));
