const Person = require("../api-utils/Person");

const Random = require("../utils/random.js");

async function getPerson(req, res) {
    // Set the seed
    var seed = parseInt(req.query.seed) || req.query.seed || Date.now();
    Random.setSeed(seed);

    // Get the image
    const { image, imageResponse } = await Person.getImage(req.query.gender, req.query.ageGroup);

    const { age, gender, ageRange, genderTranslated, hairColorTranslated, eyeColorTranslated } = image.meta;

    const height = Person.getHeight();
    const weight = Person.getWeight();

    res.send({
        name: Person.getName(gender),
        age: Random.rangeInt(ageRange[0], ageRange[1]),
        age_group: age,
        gender: genderTranslated,
        height: height,
        weight: weight,
        bmi: Person.getBMI(height.heightNumber, weight.weightNumber),
        hairColor: hairColorTranslated,
        eyeColor: eyeColorTranslated,
        image: image,
        originalImageResponse: imageResponse,
        location: Person.getLocation(),
        adress: Person.getAdress(),
        residence: Person.getResidence(),
        profession: Person.getProfession(),
        hobby: Person.getHobby(),
        crime: Person.getCrime(),
        vehicle: Person.getVehicle(),
        political_party: Person.getPoliticalParty(),
        favoriteMeal: Person.getMeal(),
        favoriteAnimal: Person.getAnimal(),
        seed: seed
    });
}
module.exports = getPerson;