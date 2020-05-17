const random = require("../utils/random.js");

const adresses = require("../json/adresses.json");

function getNoun(seed = Date.now()) {
    return adresses.nouns[(random(seed) * adresses.nouns.length) | 0];
    // |0=floor
}

function getEnding(seed = Date.now()) {
    return adresses.endings[(random(seed) * adresses.endings.length) | 0];
}

function getDirection(seed = Date.now()) {
    if ((random(seed) * 4) | (0 != 0)) {
        return "";
    }
    return adresses.directions[
        (random(seed) * adresses.directions.length) | 0
    ];
}

function getNumber(seed = Date.now()) {
    return (random(seed) * 499 + 1) | 0;
}

module.exports.getAdresses = function getAdresses(amount = 1, seed = Date.now()) {
    seed = random.asHash(seed);

    var adressesResult = [];
    for (let i = 0; i < amount; i++) {
        const direction = getDirection(seed);
        const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement
        const finalAdress = `${formattedDirection}${getNoun(seed) + getEnding(seed).toLowerCase(seed)} ${getNumber(seed)}`;

        adressesResult.push(finalAdress);

        seed = random.increaseSeed(seed);
    }

    return adressesResult;
};