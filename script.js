let imageData;
let greyValues;
const context = initCanvas();

function initCanvas() {
  const canvas = document.getElementById("base-canvas");
  const ctx = canvas.getContext("2d");
  return ctx;
}

function getImageData() {
  const image = new Image();
  image.src = "img/colosseum-2030639_1920.jpg";
  image.onload = function () {
    context.drawImage(image, 0, 0, 600, 400);
    imageData = context.getImageData(0, 0, 600, 400);
    greyValues = processColorValues();
    let [min, max] = getMinMax();
    normalizeValues(min, max);
    let matrix = produceMatrix();
    matrix = reduceMatrix(matrix);
    posterizeImage(matrix);
  };
}

function processColorValues() {
  let values = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const rgb = {
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
    };
    let lValue = getLValue(rgb.r, rgb.g, rgb.b);
    values.push(lValue);
  }
  return values;
}

function getMinMax() {
  let sortedValues = greyValues.toSorted((a, b) => a - b);
  let min = sortedValues[0];
  let max = sortedValues[sortedValues.length - 1];
  return [min, max];
}

function normalizeValues(dark, light) {
  dark += 0;
  light -= 0;
  let step = (light - dark) / 5;
  for (let i = 0; i < greyValues.length; i++) {
    if (greyValues[i] > light) {
      greyValues[i] = 0;
    } else if (greyValues[i] < light && greyValues[i] > light - step) {
      greyValues[i] = 1;
    } else if (
      greyValues[i] < light - step &&
      greyValues[i] > light - step * 2
    ) {
      greyValues[i] = 2;
    } else if (
      greyValues[i] < light - step * 2 &&
      greyValues[i] > light - step * 3
    ) {
      greyValues[i] = 3;
    } else if (
      greyValues[i] < light - step * 3 &&
      greyValues[i] > light - step * 4
    ) {
      greyValues[i] = 4;
    } else greyValues[i] = 5;
  }
}

function produceMatrix() {
  let matrix = [];
  let counter = 0;
  for (i = 0; i < 80; i += 1) {
    matrix.push([]);
    for (j = 0; j < 120; j += 1) {
      matrix[i].push([]);
    }
  }
  for (i = 0; i < 80; i += 1) {
    for (x = 0; x < 5; x++) {
      for (j = 0; j < 120; j += 1) {
        for (y = 0; y < 5; y++) {
          matrix[i][j].push(greyValues[counter]);
          counter++;
        }
      }
    }
  }
  return matrix;
}

function reduceMatrix(matrix) {
  for (i = 0; i < matrix.length; i += 1) {
    for (j = 0; j < matrix[i].length; j += 1) {
      sum = matrix[i][j].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      matrix[i][j] = Math.round(sum / 25);
    }
  }
  return matrix;
}

function posterizeImage(matrix) {
  const container = document.getElementById("poster");
  let sqValue = getDimensions(container);
  let dotsize = Math.round(sqValue / 5);
  sqValue = dotsize * 5;
  let sqSize = sqValue.toString() + "px";
  composeImage(container, sqSize, dotsize, matrix);
}

function composeImage(container, sqSize, dotsize, matrix) {
  for (i = 0; i < matrix.length; i++) {
    const row = elementBuilder(container, "div", "row");
    for (j = 0; j < matrix[i].length; j++) {
      const tile = elementBuilder(row, "div", "tile");
      tile.style.width = sqSize;
      tile.style.height = sqSize;
      const dot = elementBuilder(tile, "div", "dot");
      let currentDotSize = (dotsize * matrix[i][j]).toString() + "px";
      dot.style.width = currentDotSize;
      dot.style.height = currentDotSize;
      dot.style.backgroundColor = "black";
    }
  }
}

function getDimensions(element) {
  const rect = element.getBoundingClientRect();
  let sqWidth = rect.width / 120;
  let sqHeight = rect.height / 80;
  return parseInt(Math.min(sqWidth, sqHeight));
}

function getLValue(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let lightness = (cmax + cmin) / 2;
  lightness = +(lightness * 100).toFixed(1);
  return lightness;
}

function elementBuilder(parent, childType, childClass, childID = "") {
  let child = document.createElement(childType);
  child.className = childClass;
  child.id = childID;
  parent.appendChild(child);
  return child;
}
