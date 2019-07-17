"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 9090;

global.config = require(path.resolve(__dirname, "../../config"));

/* app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); */
app.use(express.json());
app.use(express.urlencoded());

// Routes setup
const apiRoutes = require("./routes/apiRoutes"); //importing route

app.use("/api", apiRoutes);

app.listen(port);
console.log("Api is ready on " + port);
