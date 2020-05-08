const random = require("../utils/random");

modules.exports.getWeights = function getWeights(amount = 1, min = 30, max = 100, seed = Date.now()) {
    var weightResults = [];
    for (let i = 0; i < amount; i++) {
        weightResults.push({
            weightFormatted: (random.range(min, max, seed)).toString() + "kg",
            weightNumber: (random.range(min, max, seed))
        })
        seed = random.increaseSeed(seed);
    }
    return weightResults;
}

modules.exports.getHeights = function getHeights(amount = 1, min = 110, max = 210, seed = Date.now()) {
    var heightResults = [];
    for (let i = 0; i < amount; i++) {
        heightResults.push({
            heightFormatted: (random.range(min, max, seed) / 100).toString() + "m",
            heightNumber: (random.range(min, max, seed) / 100)
        })
        seed = random.increaseSeed(seed);
    }
    return heightResults;
}

modules.exports.getBMI = function getBMI(height, weight) {
    return parseFloat((weight / (height * height)).toFixed(1));
}