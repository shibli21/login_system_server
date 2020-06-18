const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: 1,
      name: "Shibli",
      email: "Shibli@gmail.com",
      password: "1234",
      joined: new Date(),
    },
    {
      id: 2,
      name: "rabbi",
      email: "rabbi@gmail.com",
      password: "1234",
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "123das4",
    "$2b$10$hGXNMTBK4m51z4frkdptYeos1U9vRfr4ufJoUL2rI0TjeTaIoSR/6",
    function (err, res) {
      console.log(res);
    }
  );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Success");
  } else {
    res.status(400).json("Error Loging in");
  }
  res.send("Signing");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: 3,
    name: name,
    email: email,
    password: password,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (users.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("No Such user");
  }
});

// *** SignIn --> POST  == success/fail
// *** Register --> POST  == user
// *** profile/:userId --> GET  == user
// *** image --> PUT  == user

app.listen(9000, () => {
  console.log("App us running on port => 9000");
});
