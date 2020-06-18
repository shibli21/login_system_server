const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "loginSystem",
  },
});

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  return knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].hash).then((result) => {
        if (result) {
          return knex
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              console.log(user);
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("Unable to get user "));
        } else {
          res.status(400).json("Wrong ");
        }
      });
    })
    .catch((err) => res.status(400).json("Wrong Credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    return knex
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .then((email) => {});
    //   .then(res.json("Succes"));
  });

  knex
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .into("users")
    .then((user) => {
      res.json(user[0]);
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error getting users"));
});

// *** SignIn --> POST  == success/fail
// *** Register --> POST  == user
// *** profile/:userId --> GET  == user
// *** image --> PUT  == user

app.listen(9000, () => {
  console.log("App us running on port => 9000");
});
