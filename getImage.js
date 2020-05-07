const fetch = require("node-fetch");

module.exports.getImage = async function getImage(amount = 1, gender = ["female", "male"][Math.random() * 2 | 0]) {
    const page = Math.random() * 1000 | 0;

    if(amount == null) {
        amount = 1;
    }

    if(gender != "female" && gender != "male") {
        return Promise.reject("Invalid gender, please use male or female");
    }

    const URL = `https://api.generated.photos/api/frontend/v1/images?order_by=latest&page=${page}&per_page=${amount}&gender=${gender}`;

    const response = await fetch(URL, {
        headers: [["Authorization", "API-Key Cph30qkLrdJDkjW-THCeyA"]]
    });
    return Promise.resolve(await response.json());
}

module.exports.getImage(1).catch(err => console.log(err));