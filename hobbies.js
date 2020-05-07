module.exports.getHobby = function getHobby(amount) {
    var hobbiesResult = [];
    for(let i = 0; i < amount; i++){
        hobbiesResult.push(hobbies[(Math.random() * hobbies.length) | 0]);
    }
    return hobbiesResult; 
};