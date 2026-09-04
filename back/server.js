const express = require("express");
const app = express();
const cors = require("cors");
const pgp = require('pg-promise')(/* options */);

const login_dets = require('./user.json');


const db = pgp(`postgres://${login_dets.username}:${login_dets.password}@localhost:5432/KanjiAppDB`); //insert actual db
const corsOptions = {
  // origin: ["http://localhost:5173"], // front end server
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple"] });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
  db.connect()
    .then(obj => {
        console.log('Successfully connected to the database!');
        obj.done(); // Success, release the connection back to the pool
    })
    .catch(error => {
        console.log('Connection failed:', error.message || error);
    });
  
  });


app.post('/genki', async(req,res) =>
{
  var results = await db.any('SELECT * from genki');
  var dict = {};
  for (let index = 0; index < results.length; index++) {
    const element = results[index];
    if(!(element['lesson'] in dict))
      dict[element['lesson']] = [];
    dict[element['lesson']].push(element.unicode);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"results":dict}));
});