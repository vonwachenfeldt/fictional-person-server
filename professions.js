module.exports.getProfessions = function getProfessions(amount) {
    var professionResult = [];
    for (let i = 0; i < amount; i++) {
        professionResult.push(professions[(Math.random() * professions.length) | 0]);
    }
    return professionResult;
};