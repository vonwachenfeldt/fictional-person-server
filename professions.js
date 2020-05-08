const random = require("./random");

const professions = require("./json/professions.json");

module.exports.getProfessions = function getProfessions(amount = 1, seed = Date.now()) {
    var professionsResult = [];
    for (let i = 0; i < amount; i++) {
        professionsResult.push(professions[(random(seed) * professions.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return professionsResult;
};