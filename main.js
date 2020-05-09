const express = require("express");
const getPerson = require("./api/getPerson.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/person", getPerson);

app.listen(3000, () => console.log("Running on port 3000"));