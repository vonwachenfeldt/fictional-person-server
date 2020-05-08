const random = require("../utils/random");

const politicalParties = require("../json/politicalParties.json")

module.exports.getPoliticalParties = function getPoliticalParties(amount = 1, seed = Date.now()) {
    var politicalPartiesResult = [];
    for (let i = 0; i < amount; i++) {
        politicalPartiesResult.push(politicalParties[(Math.random() * politicalParties.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return politicalPartiesResult;
};