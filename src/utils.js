class utils {

  static getPixelColors(image) {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const pixels = new Array(height);

    for (let i = 0; i < height; i += 1) {
      pixels[i] = new Array(width);
    }

    const data = image.bitmap.data;

    const pixelCalculation = new Promise((resolve) => {
      image.scan(0, 0, width, height, (x, y, idx) => {
        const red = data[idx + 0];
        const green = data[idx + 1];
        const blue = data[idx + 2];
        const alpha = data[idx + 3] / 255;

        pixels[y][x] = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        if (width - 1 === x && height - 1 === y) {
          resolve(pixels);
        }
      });
    });

    return pixelCalculation;
  }

}

module.exports = utils;
