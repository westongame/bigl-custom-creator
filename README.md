# bigl-custom-creator

Visual tool for constructing custom banner pages layout

![](https://cloud.githubusercontent.com/assets/12530822/25941399/01ff3c8e-3642-11e7-889d-068dde4ca043.png)

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
        {
            column: 1,
            row: 1,
        },
        {
            column: 2,
            row: 1,
        },
        {
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            column: [1, 2],
            row: 1,
        },
        {
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            column: [1, 2, 3, 4],
            row: 1,
        },
    ],
];

biglCustomCreator(node, { presetTemplates });
```

> Note that you need to require css file from this package. This example will work if your build system supports requiring css files (webpack is one that does).

`presetTemplates` is an array of block structures that will be available for building your layout. In this example your presets will look like this:

![](https://cloud.githubusercontent.com/assets/12530822/25941312/a2af1ac4-3641-11e7-8b2b-2b85667b4a67.png)

## Demo
You can try it out on the [Demo page](https://lnevermindl.github.io/bigl-custom-creator-demo/)
