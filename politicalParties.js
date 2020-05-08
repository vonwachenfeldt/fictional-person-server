module.exports.getPoliticalParties = function getPoliticalParties(amount) {
    var politicalPartyResult = [];
    for (let i = 0; i < amount; i++) {
        politicalPartyResult.push(politicalParty[(Math.random() * politicalParty.length) | 0]);
    }
    return politicalPartyResult;
};