const fetch = require("node-fetch");
const random = require("./random");

module.exports.getImage = async function getImage(amount = 1, gender = "any", ageString = "any", seed) {
    const agesString = ["adult", "elderly", "young-adult", "child"];
    const gendersString = ["female", "male"];

    if (gender !== "any") { // only run if gender isn't specified to be any gender
        // check if the specified gender doesn't exist in the genders array
        if (!gendersString.includes(gender))
            return Promise.reject("Invalid gender, please use male or female");
    }

    if (ageString !== "any") {
        // check if the specified age exists in the ages array
        if (!agesString.includes(ageString))
            return Promise.reject("Invalid age, please use adult, elderly, young-adult or child");
    } else { // if no age is specified, generate one
        ageString = agesString[random(seed) * agesString.length | 0];
    }

    const genderURL = gendersString ? `&gender=${gender}` : ""; // format it so that if no gender is specified an image with any gender is found 

    const page = random(seed) * 1000 | 0;

    if (amount == null) 
        amount = 1;

    const URL = `https://api.generated.photos/api/frontend/v1/images?order_by=latest&page=${page}&per_page=${amount}${genderURL}&age=${ageString}`;

    const response = await fetch(URL, {
        headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]]
    });

    const JSON = await response.json();

    for (let i = 0; i < JSON.images.length; i++) {
        var meta = JSON.images[i].meta;

        var age = meta.age[0]; // same as toString() but better
        var hairColor = meta.hair_color[0];
        var eyeColor = meta.eye_color[0];

        switch (age) {
            case "child": age = [7, 15];
            case "young-adult": age = [16, 39];
            case "adult": age = [40, 54];
            case "elderly": age = [55, 80];
            default: null; break;
        }

        switch (hairColor) {
            case "gray": hairColor = "grå"; break;
            case "brown": hairColor = "brun"; break;
            case "blond": hairColor = "blond"; break;
            case "red": hairColor = "röd"; break;
            case "black": hairColor = "svart"; break;
            default: null; break;
        }

        switch (eyeColor) {
            case "gray": eyeColor = "grå"; break;
            case "brown": eyeColor = "brun"; break;
            case "blue": eyeColor = "blå"; break;
            case "green": eyeColor = "grön"; break;
            default: null; break;
        }

        meta.age_range = age;
        meta.hair_color_translated = hairColor;
        meta.eye_color_translated = eyeColor;  
    }

    return Promise.resolve(JSON);
}

module.exports.getImage(1, "male", "elderly").then(json => console.log(json.images[0].meta)).catch(err => console.log(err));