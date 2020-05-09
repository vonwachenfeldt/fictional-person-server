const express = require("express");
const getPerson = require("./api/getPerson.js");

const app = express();

app.get("/api/person", getPerson);

app.listen(3000, () => console.log("Running on port 3000"));