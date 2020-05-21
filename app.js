const express = require("express");
const cors = require("cors");

const person = require("./api/getPerson.js");
const image = require("./api/getImage.js");

const app = express();

app.use(cors());

app.use("/api/person", person);
app.use("/api/image", image);

module.exports = () => {
    const module = {};

    const port = process.env.app_port || process.env.PORT || 5000;

    module.startServer = () => app.listen(port, () => console.log("fictional-person's server running on port", port));

    module.app = app;

    return module;
}