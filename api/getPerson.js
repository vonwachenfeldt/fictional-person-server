const adresses = require("../api-utils/adresses.js");
const crimes = require("../api-utils/crimes.js");
const images = require("../api-utils/images.js");
const hobbies = require("../api-utils/hobbies.js");
const locations = require("../api-utils/locations.js");
const names = require("../api-utils/names.js");
const politicalParties = require("../api-utils/politicalParties.js");
const meals = require("../api-utils/meals.js");
const professions = require("../api-utils/professions.js");
const residences = require("../api-utils/residences.js");
const sizes = require("../api-utils/sizes.js");
const vehicles = require("../api-utils/vehicles.js");
const random = require("../utils/random.js");

async function getPerson(req, res) {
    var gender = req.query.gender;
    var ageGroup = req.query.ageGroup;
    var seed = req.query.seed || Date.now();

    const image = (await images.getImages(1, gender, ageGroup, seed)).images[0];
    gender = image.meta.gender[0];
    var height = sizes.getHeights(1, undefined, undefined, seed)[0];
    var weight = sizes.getWeights(1, undefined, undefined, seed)[0];

    res.send({
        name: names.getFullNames(1, gender, seed)[0],
        age: random.range(image.meta.age_range[0], image.meta.age_range[1], seed),
        age_group: image.meta.age[0],
        gender: image.meta.gender_translated,
        height: height,
        weight: weight,
        bmi: sizes.getBMI(height.heightNumber, weight.weightNumber),
        hair_color: image.meta.hair_color_translated,
        eye_color: image.meta.eye_color_translated,
        image: {
            url: image.thumb_url,
        },
        location: locations.getLocations(1, seed)[0],
        adress: adresses.getAdresses(1, seed)[0],
        residence: residences.getResidences(1, seed)[0],
        profession: professions.getProfessions(1, seed)[0],
        hobby: hobbies.getHobbies(1, seed)[0],
        crime: crimes.getCrimes(1, seed)[0],
        vehicle: vehicles.getVehicles(1, seed)[0],
        political_party: politicalParties.getPoliticalParties(1, seed)[0],
        favorite_meal: meals.getMeals(1, seed)[0],
        favorite_animal: "PLACEHOLDER_animal",
        seed: seed
    });
}
module.exports = getPerson;