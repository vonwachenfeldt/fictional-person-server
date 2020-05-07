module.exports.getCrime = function getCrime(amount) {
    var crimeResult = [];
    for(let i = 0; i < amount; i++){
        crimeResult.push(crimes[(Math.random() * crimes.length) | 0]);
    }
    return crimeResult; 
};