module.exports.getPoliticalParty = function getPoliticalParty(amount) {
    var politicalPartyResult = [];
    for (let i = 0; i < amount; i++) {
        politicalPartyResult.push(politicalParty[(Math.random() * politicalParty.length) | 0]);
    }
    return politicalPartyResult;
};