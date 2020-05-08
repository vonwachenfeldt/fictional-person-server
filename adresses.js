const random = require("./random");

const adresses = require("./json/adresses.json");

function getNoun(seed) {
    return adresses.nouns[(random(seed) * adresses.nouns.length) | 0];
    // |0=floor
}

function getEnding(seed) {
    return adresses.endings[(random(seed) * adresses.endings.length) | 0];
}

function getDirection(seed) {
    if ((random(seed) * 4) | (0 != 0)) {
        return "";
    }
    return adresses.directions[
        (random(seed) * adresses.directions.length) | 0
    ];
}

function getNumber(seed) {
    return (random(seed) * 499 + 1) | 0;
}

module.exports.getAdress = function getAdress(seed) {
    const direction = getDirection(seed);
    const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement
    const finalAdress = `${formattedDirection}${getNoun(seed) + getEnding(seed).toLowerCase(seed)} ${getNumber(seed)}`;

    return finalAdress;
};