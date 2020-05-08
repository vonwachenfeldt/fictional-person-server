const random = require("./random");

const hobbies = require("./json/hobbies.json");

module.exports.getHobbies = function getHobbies(amount, seed) {
    var hobbiesResult = [];
    for(let i = 0; i < amount; i++){
        hobbiesResult.push(hobbies[(random(seed) * hobbies.length) | 0]);
    }
    return hobbiesResult; 
};