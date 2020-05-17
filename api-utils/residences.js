const random = require("../utils/random.js");

const residences = require("../json/residences.json");

module.exports.getResidences = function getResidences(amount = 1, seed = Date.now()) {
    seed = random.asHash(seed);
    
    var residenceResults = [];
    for (let i = 0; i < amount; i++) {
        residenceResults.push(residences[(random(seed) * residences.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return residenceResults;
};