function getNoun() {
  return adresses.substantiv[(Math.random() * adresses.substantiv.length) | 0];
  // |0=floor
}

function getEnding() {
  return adresses.ändelser[(Math.random() * adresses.ändelser.length) | 0];
}

function getDirection() {
  if ((Math.random() * 4) | (0 != 0)) {
    return "";
  }
  return adresses.väderstreck[
    (Math.random() * adresses.väderstreck.length) | 0
  ];
}

function getNumber() {
  return (Math.random() * 499 + 1) | 0;
}

for (var i = 0; i < 100; i++) {
  var direction = getDirection();
  const formattedDirection = direction == "" ? "" : direction + " "; // clean if statement
  console.log(
    `${formattedDirection}${getNoun() +
      getEnding().toLowerCase()} ${getNumber()}`
  );
}