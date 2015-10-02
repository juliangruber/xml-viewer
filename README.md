
# xml-viewer

  Render and interact with XML in the browser

## Example

```js
var Viewer = require('xml-viewer');
var fs = require('fs');
var xml = fs.readFileSync(__dirname + '/data.xml');
var insertCSS = require('insert-css');

var view = new Viewer(xml);
view.appendTo(document.body);

view.on('select', function(node){
  if (!node) return console.log('nothing selected');
  console.log('selected:');
  console.log(node);
  console.log(node.text());
});

insertCSS('.selected { background-color: #FFFF91 }');

```

## Screenshot

  __TODO__

## Installation

```bash
$ npm install xml-viewer
```

## License

  MIT

