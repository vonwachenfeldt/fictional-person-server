const fetch = require("node-fetch");

module.exports.getImage = async function getImage(amount = 1, gender = ["female", "male"][Math.random() * 2 | 0]) {
    const page = Math.random() * 1000 | 0;

    if (amount == null) {
        amount = 1;
    }

    if (gender != "female" && gender != "male") {
        return Promise.reject("Invalid gender, please use male or female");
    }

    const URL = `https://api.generated.photos/api/frontend/v1/images?order_by=latest&page=${page}&per_page=${amount}&gender=${gender}`;

    const response = await fetch(URL, {
        headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]]
    });

    const JSON = await response.json();

    for (let i = 0; i < JSON.images.length; i++) {
        var meta = JSON.images[i].meta;
    }

    var age = meta.age.toString();
    const hairColor = meta.hair_color.toString();
    const eyeColor = meta.eye_color.toString();

    switch (age) {
        case "child": age = [7, 15];
        case "young-adult": age = [16, 39];
        case "adult": age = [40, 54];
        case "elderly": age = [55, 80];
        default: null;
    }

    switch (hairColor) {
        case "gray": hairColor = "grå";
        case "brown": hairColor = "brun";
        case "blond": hairColor = "blond";
        case "red": hairColor = "röd";
        case "black": hairColor = "black";
        default: null;
    }

    switch (eyeColor) {
        case "gray": eyeColor = "grå";
        case "brown": eyeColor = "brun";
        case "blue": eyeColor = "blå";
        case "green": eyeColor = "grön";
        default: null;
    }

    return Promise.resolve(JSON);
}

module.exports.getImage(1).catch(err => console.log(err));