function shrinkDots() {
  const dots = document.querySelectorAll("div.dot");
  dots.forEach((dot) => {
    dot.classList.add("shrinkdot");
    dot.style.width = "0";
    dot.style.height = "0";
  });
}

function growDots() {
  const dots = document.querySelectorAll("div.dot");
  dots.forEach((dot) => {
    dot.classList.add("growdot");
  });
}

function randShrink(range = 1000) {
  const dots = document.querySelectorAll("div.dot");
  const delay = [];
  dots.forEach((dot) => {
    dot.classList.add("shrinkdot");
    dot.style.transitionDelay = getRandomInt(range).toString() + "ms";
  });
  dots.forEach((dot) => {
    dot.style.width = "0";
    dot.style.height = "0";
  });
}

function randGrow(range = 1000) {
  const dots = document.querySelectorAll("div.dot");
  const delay = [];
  dots.forEach((dot) => {
    dot.style.animationDelay = getRandomInt(range).toString() + "ms";
    dot.classList.add("growdot");
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
