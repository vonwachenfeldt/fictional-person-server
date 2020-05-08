module.exports = function random(seed = Date.now()) {
    if (typeof seed === "string") { 
        var stringSeed = seed;

        seed = 0;

        for (let i = 0; i < stringSeed.length; i++) {
            seed += stringSeed[i].charCodeAt(0);
        }
    }

    var x = Math.sin(seed) * 10000;

    return x - Math.floor(x);
}

module.exports.increaseSeed = function increaseSeed(seed) { return seed + 2}