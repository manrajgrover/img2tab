const jimp = require('jimp');
const tabloUtils = require('./tabloUtils');

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
          .then(image => tabloUtils.getPixelColors(image))
          .then(pixelColors => this._getImageTable(pixelColors))
    );
  }
}

module.exports = Tablo;
