let imageData;

function getImageData() {
  const canvas = document.getElementById("base-canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = "./img/headphones-3683983_1920.jpg";
  setTimeout(() => {
    ctx.drawImage(image, 0, 0, 600, 400);
  }, 100);
}

function posterizeImage() {}
