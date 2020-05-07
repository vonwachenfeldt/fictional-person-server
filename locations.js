module.exports.getLocation = function getLocation(amount) {
    var locationResult = [];
    for(let i = 0; i < amount; i++){
        locationResult.push({municipality: municipalities[(Math.random() * municipalities.length) | 0], urbanArea: urbanAreas[(Math.random() * urbanAreas.length) | 0]});
    }
    return locationResult; 
};