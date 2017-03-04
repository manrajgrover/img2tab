# img2tab
[![npm](https://img.shields.io/npm/v/img2tab.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/img2tab) [![npm](https://img.shields.io/npm/dt/img2tab.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/img2tab) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

> Convert images to HTML tables, for dynamic QR Codes, barcodes and more

## Install

```
$ npm install img2tab
```

## Usage

### Method available

* `getTable`: Get HTML table for image given, returns a Promise

### How to use

Getting HTML Table for given image

```javascript
const Img2Tab = require('img2tab');

const instance = new Img2Tab('your image path/url');

const imageTable = instance.getTable();

imageTable.then(data => console.log(data));
// => String of HTML table
```

## License

[MIT](https://github.com/ManrajGrover/img2tab/blob/master/LICENSE) © Manraj Singh
