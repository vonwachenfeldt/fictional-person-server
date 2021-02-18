const seedrandom = require("seedrandom");
class Random {
    constructor(seed) {
        this.setSeed(seed);
    }
    
    setSeed(seed) {
        this.seed = seed;
        this.random = seedrandom(seed);
    }

    getSeed() {
        return this.seed;
    }

    /**
     * Returns a random int between 0 (inclusive) and max (exclusive)
     */
    intMax(max) {
        return Math.floor(this.random() * max); 
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    rangeFloat(min, max) {
        return this.random() * (max - min) + min;
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     */
    rangeInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.random() * (max - min + 1)) + min;
    }
}

module.exports = Random;

/*
module.exports = random;

module.exports.setSeed = function setSeed(seed) {

}

module.exports.asHash = function asHash(seed) { return hash(seed); }

module.exports.increaseSeed = function increaseSeed(seed) { return seed * 2 + 3 }

module.exports.range = function range(min, max, seed) {
    return random(seed) * (max - min + 1) + min | 0;
}*/