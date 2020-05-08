module.exports.getVeichles = function getVeichles(amount) {
    var veichleResult = [];
    for (let i = 0; i < amount; i++) {
        veichleResult.push(veichle[(Math.random() * veichle.length) | 0]);
    }
    return veichleResult;
};
