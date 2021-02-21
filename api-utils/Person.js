const Random = require("../utils/random.js");

const fetch = require("node-fetch");

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
const firstnames = require("../json/firstnamesEthnicity.json");
const surnames = require("../json/surnames.json");
const personalityTraits = require("../json/personalityTraits.json");
const diseases = require("../json/diseases.json");
const organizations = require("../json/organizations.json");
class Person {
    constructor(seed) {
        this.seed = seed;
        this.random = new Random(seed);

        this.ages = ["adult", "elderly", "young-adult", "child"];
        this.genders = ["female", "male"];
        this.ethnicities = ["white", "black", "latino", "asian"];
    }

    // Names
    getName(gender = "any") {
        const genders = ["female", "male"];
    
        if (gender === "any")  // only run if gender isn't specified to be any gender
            gender = genders[this.random.intMax(genders.length)]
    
        if (!genders.includes(gender))
            return;

        const firstname = firstnames[gender][this.random.intMax(firstnames[gender].length)];
    
        return {
            firstname: firstname.name,
            surname: surnames[this.random.intMax(surnames.length)],
            ethnicity: firstname.ethnicity
        };
    };
    // Vechicles
    getVehicle() { return vehicles[this.random.intMax(vehicles.length)]; }
    // Residences
    getResidence() { return residences[this.random.intMax(residences.length)]; }
    // Meals
    getMeal() { return meals[this.random.intMax(meals.length)]; }
    // Locations
    getLocation() { 
        return {
            municipality: locations.municipalities[this.random.intMax(locations.municipalities.length)],
            urbanArea: locations.urbanAreas[this.random.intMax(locations.urbanAreas.length)]
        }
    };
    // Personality Traits
    getPersonalityTrait() { return personalityTraits[this.random.intMax(personalityTraits.length)]; }
    // Hobbies
    getHobby() { return hobbies[this.random.intMax(hobbies.length)]; }
    // Crimes
    getCrime() { return crimes[this.random.intMax(crimes.length)]; }
    // Professions
    getProfession() { return professions[this.random.intMax(professions.length)]; }
    // Animals
    getAnimal() { return animals[this.random.intMax(animals.length)]; }
    // Politics
    getPoliticalParty() { return politicalParties[this.random.intMax(politicalParties.length)]; }
    // Diseases
    getDisease() { return diseases[this.random.intMax(diseases.length)]; }
    // Organization
    getOrganization() { return organizations[this.random.intMax(organizations.length)]; }
    // Weight
    getWeight(min = 40, max = 80) { 
        var weight = this.random.rangeInt(min, max);
        return {
            weightNumber: weight,
            weightFormatted: weight.toString() + "kg"
        }
    };
    // Height
    getHeight(min = 140, max = 210) {
        const heightMeters = this.random.rangeInt(min, max) / 100;

        return {
            heightFormatted: heightMeters.toString() + "m",
            heightNumber: heightMeters
        }
    };
    // BMI
    getBMI(height, weight) {
        return parseFloat((weight / (height * height)).toFixed(1));
    };
    // age
    getAge(ageRange) { return this.random.rangeInt(ageRange[0], ageRange[1]) };
    // Adress
    getAdressNoun() { return adresses.nouns[this.random.intMax(adresses.nouns.length)]; }
    getAdressEnding() { return adresses.endings[this.random.intMax(adresses.endings.length)]; }
    getAdressDirection() { return adresses.directions[this.random.intMax(adresses.directions.length)]; } 
    getAdressNumber() { return this.random.intMax(500); }
    getAdress() {
        const direction = this.getAdressDirection();
        const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement (??)
        const finalAdress = `${formattedDirection}${this.getAdressNoun()}${this.getAdressEnding().toLowerCase()} ${this.getAdressNumber()}`;

        return finalAdress;
    };

    // Images
    async getImageQuantities(gender, age, ethnicity) {
        // Get how many images exists with the current attributes
        const updateImageQuantity = async (gender, age, ethnicity) => {
            const url = 
                `https://api.generated.photos/api/frontend/v1/filters?gender=${gender}&age=${age}&ethnicity=${ethnicity}`;

            const response = await fetch(url, { headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]] });
            const json = await response.json();

            const count = json.filters[2].values[0].count; 

            // Update the variable
            if (!Person.imageQuantityCache[gender])
                Person.imageQuantityCache[gender] = {};
            if (!Person.imageQuantityCache[gender][age])
                Person.imageQuantityCache[gender][age] = {};

            Person.imageQuantityCache[gender][age][ethnicity] = count;
        } 

        // check if it exists in the cache
        try {
            const count = Person.imageQuantityCache[gender][age][ethnicity];

            return count;
        } catch (error) {
            // doesn't exist, so update all the cached variables7

            const promises = [];
            for (let g = 0; g < this.genders.length; g++) {
                for (let a = 0; a < this.ages.length; a++) {
                    for (let e = 0; e < this.ethnicities.length; e++) {
                        promises.push(updateImageQuantity(this.genders[g], this.ages[a], this.ethnicities[e]));
                    }
                }
            }

            await Promise.all(promises);

            console.log("Done updating cache");

            const count = Person.imageQuantityCache[gender][age][ethnicity];
            return count;
        }
    }

    async getImage(gender = "any") { 
        if (gender !== "any") { // only run if gender isn't specified to be any gender
            // check if the specified gender doesn't exist in the genders array
            if (!this.genders.includes(gender))
                throw "Invalid gender, please use male or female";
        } else {
            // Randomize gender
            gender = this.genders[this.random.intMax(this.genders.length)];
        }
    
        const age = this.ages[this.random.intMax(this.ages.length)];
        const ethnicity = this.ethnicities[this.random.intMax(this.ethnicities.length)];

        // Get how many images exists with the current attributes
        var imageCount = await this.getImageQuantities(gender, age, ethnicity);

        // create a white person if no person with those attributes exists
        if (imageCount === 0) {
            ethnicity = "white";

            imageCount = await this.getImageQuantity(gender, age, ethnicity);
        }
        // Choose a page to get images from
        const randomPage = this.random.intMax(imageCount - 1) + 1;

        console.log("Gender: %s, age: %s, ethnicity: %s, page %s of %s",
            gender, age, ethnicity, randomPage, imageCount);
    
        const url = 
            `https://api.generated.photos/api/frontend/v1/images?order_by=latest&page=${randomPage}&per_page=1&gender=${gender}&age=${age}&ethnicity=${ethnicity}`;
    
        const response = await fetch(url, {
            headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]]
        });
    
        const json = await response.json();

        // Choose the first image
        const image = json.images[0];

        const originalJson = JSON.parse(JSON.stringify(json)); // Remove the reference to the original object
        
        const hairColor = image.meta.hair_color[0];
        const eyeColor = image.meta.eye_color[0];
    
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
        switch(gender) {
            case "male": genderTranslated = "man"; break;
            case "female": genderTranslated = "kvinna"; break;
        }
    
        // Convert single-element arrays into a single variable
        image.meta.gender = image.meta.gender[0];
        image.meta.age = image.meta.age[0];
        image.meta.ethnicity = image.meta.ethnicity[0];
        image.meta.eye_color = image.meta.eye_color[0];
        image.meta.hair_color = image.meta.hair_color[0];
        image.meta.hair_length = image.meta.hair_length[0];
        image.meta.emotion = image.meta.emotion[0];
    
        // Add the custom variables
        image.meta.ageRange = ageRange; 
        image.meta.hairColorTranslated = hairColorTranslated; 
        image.meta.eyeColorTranslated = eyeColorTranslated;
        image.meta.genderTranslated = genderTranslated;
    
        return { 
            imageResponse: originalJson, 
            image: image,
            imageUrl: image.thumb_url
        };
    };

    async generatePerson(queryGender, queryAgeGroup) {
        this.random.setSeed(this.seed);

        // Get the image
        const { image, imageUrl, imageResponse } = await this.getImage(queryGender, queryAgeGroup);

        const { age, gender, ageRange, genderTranslated, hairColorTranslated, eyeColorTranslated } = image.meta;

        const height = this.getHeight();
        const weight = this.getWeight();

        const person = {
            name: this.getName(gender),
            age: this.getAge(ageRange),
            ageGroup: age,
            gender: genderTranslated,
            height: height,
            weight: weight,
            bmi: this.getBMI(height.heightNumber, weight.weightNumber),
            hairColor: hairColorTranslated,
            eyeColor: eyeColorTranslated,
            image: image,
            imageUrl: imageUrl,
            originalImageResponse: imageResponse,
            location: this.getLocation(),
            adress: this.getAdress(),
            residence: this.getResidence(),
            profession: this.getProfession(),
            hobby: this.getHobby(),
            crime: this.getCrime(),
            vehicle: this.getVehicle(),
            politicalParty: this.getPoliticalParty(),
            favoriteMeal: this.getMeal(),
            favoriteAnimal: this.getAnimal(),
            personalityTrait: this.getPersonalityTrait(),
            disease: this.getDisease(),
            organization: this.getOrganization(),
            seed: this.seed
        };

        return person;
    }
}

// init image quantities cache
Person.imageQuantityCache = {};

module.exports = Person;