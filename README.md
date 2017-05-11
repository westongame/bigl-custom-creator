# bigl-custom-creator

Visual tool for constructing custom banner pages layout

![](https://cloud.githubusercontent.com/assets/12530822/25944126/e075d574-364a-11e7-8db6-b9f0ee72417d.png)

## Installation

The package can be installed via NPM:
```
npm install bigl-custom-creator --save
```

## Dependencies

You’ll need to install some dependencies separately since they aren’t included in the package:

* react
* react-dom
* prop-types
* classnames
* rx
* tanok

## Example

Here's simple usage example:

```js
import biglCustomCreator from 'bigl-custom-creator';
import 'bigl-custom-creator/dist/index.min.css';

const node = document.getElementById('app');
const presetTemplates = [
    [
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 1, column: [3, 4] },
    ],
    [
        { row: 1, column: [1, 2] },
        { row: 1, column: [3, 4] },
    ],
    [
        { row: 1, column: [1, 2, 3, 4] },
    ],
];
const importJSON = null; // or an exported JSON you want to load
const onExportJSON = ...; // a callback which will receive data in JSON format

biglCustomCreator(node, { { presetTemplates, importJSON, onExportJSON } });
```

> Note that you need to require css file from this package. This example will work if your build system supports requiring css files (webpack is one that does).

`presetTemplates` is an array of block structures that will be available for building your layout. In this example your presets will look like this:

![](https://cloud.githubusercontent.com/assets/12530822/25941312/a2af1ac4-3641-11e7-8b2b-2b85667b4a67.png)

## Demo
You can try it out on the [Demo page](https://lnevermindl.github.io/bigl-custom-creator-demo/)
