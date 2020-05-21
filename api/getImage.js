const express = require("express");

const router = express.Router();

const images = require("../api-utils/images.js");

router.get("/", async (req, res) => {
    // Parse the query parameters
    const count = parseInt(req.query.count) || 1;
    const gender = req.query.gender || "any";
    const ageGroup = req.query.ageGroup || "any";
    const seed = parseInt(req.query.seed) || req.query.seed || Date.now();

    const image = await images.getImages(count, gender, ageGroup, seed); 

    res.send(image);
});

module.exports = router;