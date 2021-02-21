const Person = require("../api-utils/Person");

const uuid = require("uuid").v4;

const isNumber = (num) => !isNaN(num);

async function getPerson(req, res) {
    // Create a more random default seed
    const defaultSeed = uuid();
    const qSeed = req.query.seed;

    // Set the seed
    // Prefer the seed as an int for backwards compatibility, otherwise use it as a string
    var seed = isNumber(qSeed) ? parseInt(qSeed) : (req.query.seed || defaultSeed);
    
    const person = new Person(seed);
    const generatedPerson = await person.generatePerson(req.query.gender, req.query.ageGroup);

    res.json(generatedPerson);
}
module.exports = getPerson;