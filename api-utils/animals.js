const random = require("../utils/random.js");

const animals = require("../json/animals.json");

module.exports.getAnimals = function getAnimals(amount = 1, seed = Date.now()) {
    seed = random.asHash(seed);

    var animalResults = [];
    for (let i = 0; i < amount; i++) {
        animalResults.push(animals[(random(seed) * animals.length) | 0]);

        seed = random.increaseSeed(seed);
    }

    return animalResults;
};