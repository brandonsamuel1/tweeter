"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


MongoClient.connect(MONGODB_URI, (error, db) => {
  if(error) throw error;

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
