const random = require("../utils/random.js");

const vehicles = require("../json/vehicles.json");

module.exports.getVehicles = function getVehicles(amount = 1, seed = Date.now()) {
    seed = random.asHash(seed);
    
    var vehicleResults = [];
    for (let i = 0; i < amount; i++) {
        vehicleResults.push(vehicles[(random(seed) * vehicles.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return vehicleResults;
};