const random = require("../utils/random");

const firstnames = require("../json/firstnames.json");
const surnames = require("../json/surnames.json");

module.exports.getFullNames = function getFullNames(amount = 1, gender = "any", seed = Date.now()) {
    seed = random.asHash(seed);

    const genders = ["female", "male"];

    if (gender === "any")  // only run if gender isn't specified to be any gender
        gender = genders[random(seed) * genders.length | 0]

    if (!genders.includes(gender)) {
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