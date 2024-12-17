let imageData;
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
    console.log(imageData.data);
  }, 1000);
}

const buildRgb = (imgData) => {
  const rgbValues = [];
  for (let i = 0; i < imgData.length; i += 4) {
    const rgb = {
      r: imgData[i],
      g: imgData[i + 1],
      b: imgData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

function posterizeImage() {}
