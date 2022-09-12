const fs = require("fs");
let bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// let Database = JSON.parse(fs.readFileSync("Database.json", "utf8"));
let login = JSON.parse(fs.readFileSync("Login.json", "utf8"));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: login.user,
    password: login.password,
    database: login.database,
  },
});

app.use((req, res, next) => {
  console.log("Connected");
  console.log(req.body);
  next();
});

// tipo

app.post("/tipo", (req, res) => {
  try {
    console.log("Tipo");
    console.log(req.body.tipo);

    knex("Carros")
      .where("cod_tipo", req.body.tipo)
      .then((carros) => res.json(carros));
  } catch (error) {
    res.json({ erro: error });
  }
});

//marca

app.get("/marcas", (req, res) => {
  knex("Marcas").then((carros) => res.json(carros));
});

app.post("/tipoEmarca", (req, res) => {
  try {
    console.log(req.body.tipo);

    knex("Carros")
      .where("cod_tipo", req.body.tipo)
      .andWhere("cod_marca", req.body.marca)
      .then((carros) => res.json(carros));
  } catch (error) {
    res.json({ erro: error });
  }
});

// ano

app.post("/ano", (req, res) => {
  try {
    console.log(req.body.ano);

    knex("Carros")
      .where("ano", req.body.ano)
      .andWhere("cod_marca", req.body.marca)
      .then((carros) => res.json(carros));
  } catch (error) {
    res.json({ erro: error });
  }
});

// combustivel

app.post("/fuel", (req, res) => {
  try {
    console.log(req.body.fuel);

    knex("Carros")
      .where("cod_fuel", req.body.fuel)
      .then((carros) => res.json(carros));
  } catch (error) {
    res.json({ erro: error });
  }
});

app.listen(3000);
