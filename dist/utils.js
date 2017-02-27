"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = function () {
  function utils() {
    _classCallCheck(this, utils);
  }

  _createClass(utils, null, [{
    key: "getPixelColors",
    value: function getPixelColors(image) {
      var width = image.bitmap.width;
      var height = image.bitmap.height;
      var pixels = new Array(height);

      for (var i = 0; i < height; i += 1) {
        pixels[i] = new Array(width);
      }

      var data = image.bitmap.data;

      var pixelCalculation = new Promise(function (resolve) {
        image.scan(0, 0, width, height, function (x, y, idx) {
          var red = data[idx + 0];
          var green = data[idx + 1];
          var blue = data[idx + 2];
          var alpha = data[idx + 3] / 255;

          pixels[x][y] = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";

          if (width - 1 === x && height - 1 === y) {
            resolve(pixels);
          }
        });
      });

      return pixelCalculation;
    }
  }]);

  return utils;
}();

module.exports = utils;