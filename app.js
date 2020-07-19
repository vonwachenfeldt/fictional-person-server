const express = require("express");
const getPerson = require("./api/getPerson.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.use0("/api/person", getPerson);

module.exports = () => {
    const module = {};

    const port = process.env.app_port || process.env.PORT || 5000;

    module.startServer = () => app.listen(port, () => console.log("fictional-person's server running on port", port));

    module.app = app;

    return module;
}