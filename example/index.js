var Viewer = require('..');
var fs = require('fs');
var xml = fs.readFileSync(__dirname + '/data.xml');
var insertCSS = require('insert-css');

insertCSS('body { font-family: monospace; margin: 50px 100px } .selected { background-color: #FFFF91 }');

var view = new Viewer(xml);
view.appendTo(document.body);

view.on('select', function(node){
  if (!node) return console.log('nothing selected');
  console.log('selected:');
  console.log(node);
  console.log(node.text());
});

