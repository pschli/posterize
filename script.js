let imageData;
let greyValues;
const context = initCanvas();

function initCanvas() {
  const canvas = document.getElementById("base-canvas");
  const ctx = canvas.getContext("2d");
  return ctx;
}

function loadImage() {
  const image = new Image();
  image.src = "./img/headphones-3683983_1920.jpg";
  image.onload = function () {
    context.drawImage(image, 0, 0, 600, 400);
    imageData = context.getImageData(0, 0, 600, 400);
  };
}

function getImageData() {
  loadImage();
  setTimeout(() => {
    greyValues = processColorValues();
    let [min, max] = getMinMax();
    normalizeValues(min, max);
    let matrix = produceMatrix();
    matrix = reduceMatrix(matrix);
    console.log(matrix);
  }, 1000);
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
  let sortedValues = greyValues.toSorted();
  let min = sortedValues[0];
  let max = sortedValues[sortedValues.length - 1];
  return [min, max];
}

function normalizeValues(dark, light) {
  dark += 10;
  light -= 10;
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
  for (i = 0; i < 40; i += 1) {
    matrix.push([]);
    for (j = 0; j < 60; j += 1) {
      matrix[i].push([]);
    }
  }
  for (i = 0; i < 40; i += 1) {
    for (x = 0; x < 10; x++) {
      for (j = 0; j < 60; j += 1) {
        for (y = 0; y < 10; y++) {
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
      matrix[i][j] = Math.round(sum / 100);
    }
  }
  return matrix;
}

function posterizeImage() {}

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
