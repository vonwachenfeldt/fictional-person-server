const random = require("./random");

const firstnames = require("./json/firstnames.json");
const surnames = require("./json/surnames.json");

module.exports.getFullNames = function getFullNames(amount = 1, gender = ["female", "male"][(Math.random() * 2) | 0], seed) {
    if (gender != "female" && gender != "male") {
        return {
            err: "Invalid gender, choose female OR male."
        };
    }

    var fullNameResults = [];
    for (let i = 0; i < amount; i++) {
        fullNameResults.push({
            firstName: firstnames[gender][(random(seed) * firstnames[gender].length) | 0],
            surName: surnames[(random(seed) * surnames.length) | 0]
        });

        seed = random.increaseSeed(seed);
    }

    return fullNameResults;
};