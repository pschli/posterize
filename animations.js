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
