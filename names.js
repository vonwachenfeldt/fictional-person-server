module.exports.getFullName = function getFullName(
    gender = ["female", "male"][(Math.random() * 2) | 0],
    amount = 1
) {
    if (gender != "female" && gender != "male") {
        return {
            err: "Invalid gender, please use male or female"
        };
    }
    var fullNameResults = [];
    for (let i = 0; i < amount; i++) {
        fullNameResults.push({
            firstName: firstnames[gender][(Math.random() * firstnames[gender].length) | 0],
            lastName: surnames[(Math.random() * surnames.length) | 0]
        });
    }
    return fullNameResults.length === 1 ? fullNameResults[0] : fullNameResults;
};