function getNoun() {
    return adresses.nouns[(Math.random() * adresses.substantiv.length) | 0];
    // |0=floor
}

function getEnding() {
    return adresses.endings[(Math.random() * adresses.ändelser.length) | 0];
}

function getDirection() {
    if ((Math.random() * 4) | (0 != 0)) {
        return "";
    }
    return adresses.directions[
        (Math.random() * adresses.väderstreck.length) | 0
    ];
}

function getNumber() {
    return (Math.random() * 499 + 1) | 0;
}

module.exports.getAdress = function getAdress() {
    const direction = getDirection();
    const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement
    const finalAdress =`${formattedDirection}${getNoun()+getEnding().toLowerCase()} ${getNumber()}`;
    return finalAdress;
};