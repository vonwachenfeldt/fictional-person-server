const fetch = require("node-fetch");
const Random = require("../utils/random");

const getImage = async (gender = "any", ageString = "any") => {
    const agesString = ["adult", "elderly", "young-adult", "child"];
    const gendersString = ["female", "male"];

    if (gender !== "any") { // only run if gender isn't specified to be any gender
        // check if the specified gender doesn't exist in the genders array
        if (!gendersString.includes(gender))
            throw "Invalid gender, please use male or female";
    }

    if (ageString !== "any") {
        // check if the specified age exists in the ages array
        if (!agesString.includes(ageString))
            throw "Invalid age, please use adult, elderly, young-adult or child";
    } else { // if no age is specified, generate one
        ageString = agesString[Random.intMax(agesString.length)];
    }

    const genderURL = gender != "any" ? `&gender=${gender}` : ""; // format it so that if no gender is specified an image with any gender is found 

    // TODO: Why 1000?
    const page = Random.intMax(1000);

    const url = `https://api.generated.photos/api/frontend/v1/images?order_by=latest&page=${page}&per_page=1${genderURL}&age=${ageString}`;

    const response = await fetch(url, {
        headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]]
    });

    const json = await response.json();
    const originalJson = JSON.parse(JSON.stringify(json)); // Remove the reference to the original object
    
    const meta = json.images[0].meta;
    const age = meta.age[0];
    const hairColor = meta.hair_color[0];
    const eyeColor = meta.eye_color[0];
    const genderValue = meta.gender[0];

    var ageRange = [];
    switch (age) {
        case "child": ageRange = [7, 13]; break;
        case "young-adult": ageRange = [14, 39]; break;
        case "adult": ageRange = [40, 54]; break; 
        case "elderly": ageRange = [55, 80]; break;
    }

    var hairColorTranslated = "";
    switch (hairColor) {
        case "gray": hairColorTranslated = "grå"; break;
        case "brown": hairColorTranslated = "brun"; break;
        case "blond": hairColorTranslated = "blond"; break;
        case "red": hairColorTranslated = "röd"; break;
        case "black": hairColorTranslated = "svart"; break;
    }

    var eyeColorTranslated = "";
    switch (eyeColor) {
        case "gray": eyeColorTranslated = "grå"; break;
        case "brown": eyeColorTranslated = "brun"; break;
        case "blue": eyeColorTranslated = "blå"; break;
        case "green": eyeColorTranslated = "grön"; break;
    }

    var genderTranslated = "";
    switch(genderValue) {
        case "male": genderTranslated = "man"; break;
        case "female": genderTranslated = "kvinna"; break;
    }

    // Convert single-element arrays into a single variable
    meta.gender = meta.gender[0];
    meta.age = meta.age[0];
    meta.ethnicity = meta.ethnicity[0];
    meta.eye_color = meta.eye_color[0];
    meta.hair_color = meta.hair_color[0];
    meta.hair_length = meta.hair_length[0];
    meta.emotion = meta.emotion[0];

    // Add the custom variables
    meta.ageRange = ageRange; 
    meta.hairColorTranslated = hairColorTranslated; 
    meta.eyeColorTranslated = eyeColorTranslated;
    meta.genderTranslated = genderTranslated;

    return { 
        imageResponse: originalJson, 
        image: json.images[0],
        imageUrl: json.images[0].thumb_url
    };
}
module.exports.getImage = getImage;