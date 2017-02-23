const jimp = require('jimp');

class Tablo {

  constructor(image) {
    if (image === undefined || image === '') {
      throw new Error(
        'Initialization failed. Please check file path passd to constructor.'
      );
    }
    this.image = image;
    this.colors = null;
  }

  _readImage() {
    return jimp.read(this.image)
               .catch(err => err);
  }

  _getPixelColors(image) {
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

        pixels[x][y] = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        if (width - 1 === x && height - 1 === y) {
          resolve(pixels);
        }
      });
    });

    return pixelCalculation;
  }

  getTablo() {
    return (
      this._readImage().then(image => this._getPixelColors(image))
    );
  }
}

module.exports = Tablo;
