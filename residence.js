module.exports.getResidence = function getResidence(amount) {
    var residenceResult = [];
    for(let i = 0; i < amount; i++){
        residenceResult.push(residence[(Math.random() * residence.length) | 0]);
    }
    return residenceResult; 
};