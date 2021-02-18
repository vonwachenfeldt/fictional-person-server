const Person = require("../api-utils/Person");

async function getPerson(req, res) {
    // Set the seed
    var seed = parseInt(req.query.seed) || req.query.seed || Date.now();
    
    const person = new Person(seed);
    const generatedPerson = await person.generatePerson(req.query.gender, req.query.ageGroup);

    res.json(generatedPerson);
}
module.exports = getPerson;