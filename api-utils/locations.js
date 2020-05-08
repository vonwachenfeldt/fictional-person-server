const random = require("../utils/random");

const locations = require("../json/locations.json");

module.exports.getLocations = function getLocations(amount = 1, seed = Date.now()) {
    var locationsResult = [];
    for (let i = 0; i < amount; i++) {
        locationsResult.push({
            municipality: locations.municipalities[(random(seed) * locations.municipalities.length) | 0],
            urbanArea: locations.urbanAreas[(random(seed) * locations.urbanAreas.length) | 0]
        });

        seed = random.increaseSeed(seed);
    }
    return locationsResult;
};