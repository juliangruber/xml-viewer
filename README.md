
# xml-viewer

  Render and interact with XML in the browser

## Example

```js
var Viewer = require('xml-viewer');
var fs = require('fs');
var xml = fs.readFileSync(__dirname + '/data.xml');

var view = new Viewer(xml);
view.appendTo(document.body);
```

## Screenshot

  __TODO__

## Installation

```bash
$ npm install xml-viewer
```

## License

  MIT

