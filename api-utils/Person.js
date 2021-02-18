const Random = require("../utils/random.js");

const image = require("./image.js");

// JSON data
const vehicles = require("../json/vehicles.json");
const residences = require("../json/residences.json");
const meals = require("../json/meals.json");
const politicalParties = require("../json/politicalParties.json");
const locations = require("../json/locations.json");
const hobbies = require("../json/hobbies.json");
const crimes = require("../json/crimes.json");
const professions = require("../json/professions.json");
const adresses = require("../json/adresses.json");
const animals = require("../json/animals.json");
const firstnames = require("../json/firstnames.json");
const surnames = require("../json/surnames.json");

// Images
module.exports.getImage = image.getImage;

// Names
const getName = (gender = "any") => {
    const genders = ["female", "male"];

    if (gender === "any")  // only run if gender isn't specified to be any gender
        gender = genders[Random.intMax(genders.length)]

    if (!genders.includes(gender))
        return;

    return {
        firstname: firstnames[gender][Random.intMax(firstnames[gender].length)],
        surname: surnames[Random.intMax(surnames.length)]
    };
}
module.exports.getName = getName;

// Vechicles
const getVehicle = () => vehicles[Random.intMax(vehicles.length)];
module.exports.getVehicle = getVehicle;

// Residences
const getResidence = () => residences[Random.intMax(residences.length)];
module.exports.getResidence = getResidence;

// Meals
const getMeal = () => meals[Random.intMax(meals.length)];
module.exports.getMeal = getMeal;

// Locations
const getLocation = () => ({
    municipality: locations.municipalities[Random.intMax(locations.municipalities.length)],
    urbanArea: locations.urbanAreas[Random.intMax(locations.urbanAreas.length)]
});
module.exports.getLocation = getLocation;

// Hobbies
const getHobby = () => hobbies[Random.intMax(hobbies.length)];
module.exports.getHobby = getHobby;

// Crimes
const getCrime = () => crimes[Random.intMax(crimes.length)];
module.exports.getCrime = getCrime;

// Professions
const getProfession = () => professions[Random.intMax(professions.length)];
module.exports.getProfession = getProfession;

// Animals
const getAnimal = () => animals[Random.intMax(animals.length)];
module.exports.getAnimal = getAnimal;

// Politics
const getPoliticalParty = () => politicalParties[Random.intMax(politicalParties.length)];
module.exports.getPoliticalParty = getPoliticalParty;

// Weight
const getWeight = (min = 40, max = 80) => ({
    weightFormatted: Random.rangeInt(min, max).toString() + "kg",
    weightNumber: Random.rangeInt(min, max)
});
module.exports.getWeight = getWeight;

// Height
const getHeight = (min = 140, max = 210) => {
    const heightMeters = Random.rangeInt(min, max) / 100;

    return {
        heightFormatted: heightMeters.toString() + "m",
        heightNumber: heightMeters
    }
};
module.exports.getHeight = getHeight;

// BMI
const getBMI = (height, weight) => parseFloat((weight / (height * height)).toFixed(1));
module.exports.getBMI = getBMI;

// Adress
const getAdressNoun = () => adresses.nouns[Random.intMax(adresses.nouns.length)];
const getAdressEnding = () => adresses.endings[Random.intMax(adresses.endings.length)];
const getAdressDirection = () => adresses.directions[Random.intMax(adresses.directions.length)];
const getAdressNumber = () => Random.intMax(500);
const getAdress = () => {
    const direction = getAdressDirection();
    const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement (??)
    const finalAdress = `${formattedDirection}${getAdressNoun()}${getAdressEnding().toLowerCase()} ${getAdressNumber()}`;

    return finalAdress;
};
module.exports.getAdress = getAdress;