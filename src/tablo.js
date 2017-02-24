const jimp = require('jimp');

class Tablo {

  constructor(image, width = 1, height = 1) {
    if (image === undefined || image === '') {
      throw new Error(
        'Initialization failed. Please check file path passd to constructor.'
      );
    }
    this.image = image;
    this.colors = null;
    this.width = width;
    this.height = height;
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

  _getImageTable(img) {
    const pImageTable = new Promise((resolve) => {
      let imageTable = "<table border='0' cellpadding='0' cellspacing='0'>";

      for (let i = 0; i < img.length; i += 1) {
        imageTable += '<tr>';
        for (let j = 0; j < img[i].length; j += 1) {
          imageTable += `<td height='${this.height}' width='${this.width}' style='background: ${img[i][j]};'>`;
        }
        imageTable += '</tr>';
      }

      imageTable += '</table>';
      resolve(imageTable);
    });

    return pImageTable;
  }

  getTablo() {
    return (
      this._readImage()
          .then(image => this._getPixelColors(image))
          .then(pixelColors => this._getImageTable(pixelColors))
    );
  }
}

module.exports = Tablo;
