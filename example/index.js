var Viewer = require('..');
var fs = require('fs');
var xml = fs.readFileSync(__dirname + '/data.xml');

var view = new Viewer(xml);
