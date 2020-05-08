const random = require("./random");

const crimes = require("./json/crimes.json")

module.exports.getCrimes = function getCrimes(amount, seed) {
    var crimeResult = [];
    for(let i = 0; i < amount; i++){
        crimeResult.push(crimes[(random(seed) * crimes.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return crimeResult; 
};