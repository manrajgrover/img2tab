'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jimp = require('jimp');
var utils = require('./utils');

var img2tab = function () {
  function img2tab(image) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, img2tab);

    if (image === undefined || image === '') {
      throw new Error('Initialization failed. Please check file path passd to constructor.');
    }

    this.image = image;
    this.colors = null;
    this.width = width;
    this.height = height;
  }

  _createClass(img2tab, [{
    key: '_readImage',
    value: function _readImage() {
      return jimp.read(this.image).catch(function (err) {
        return err;
      });
    }
  }, {
    key: '_getImageTable',
    value: function _getImageTable(img) {
      var _this = this;

      var pImageTable = new Promise(function (resolve) {
        var imageTable = "<table border='0' cellpadding='0' cellspacing='0'>";

        for (var i = 0; i < img.length; i += 1) {
          imageTable += '<tr>';
          for (var j = 0; j < img[i].length; j += 1) {
            imageTable += '<td height=\'' + _this.height + '\' width=\'' + _this.width + '\' style=\'background: ' + img[i][j] + ';\'>';
          }
          imageTable += '</tr>';
        }

        imageTable += '</table>';
        resolve(imageTable);
      });

      return pImageTable;
    }
  }, {
    key: 'getTable',
    value: function getTable() {
      var _this2 = this;

      return this._readImage().then(function (image) {
        return utils.getPixelColors(image);
      }).then(function (pixelColors) {
        return _this2._getImageTable(pixelColors);
      });
    }
  }]);

  return img2tab;
}();

module.exports = img2tab;