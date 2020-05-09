const random = require("../utils/random.js");

const meals = require("../json/meals.json");

module.exports.getMeals = function getMeals(amount = 1, seed = Date.now()) {
    var mealResults = [];
    for (let i = 0; i < amount; i++) {
        mealResults.push(meals[(random(seed) * meals.length) | 0]);

        seed = random.increaseSeed(seed);
    }
    return mealResults;
};