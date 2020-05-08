const random = require("../utils/random");

const hobbies = require("../json/hobbies.json");

module.exports.getHobbies = function getHobbies(amount = 1, seed = Date.now()) {
    var hobbiesResult = [];
    for (let i = 0; i < amount; i++) {
        hobbiesResult.push(hobbies[(random(seed) * hobbies.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return hobbiesResult;
};