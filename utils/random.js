const seedrandom = require("seedrandom");
const hash = require("./hash");

module.exports = function random(seed) {
    return seedrandom(seed)();
}

module.exports.asHash = function asHash(seed) { return hash(seed); }

module.exports.increaseSeed = function increaseSeed(seed) { return seed * 2 + 3 }

module.exports.range = function range(min, max, seed) {
    return module.exports(seed) * (max - min + 1) + min | 0;
}