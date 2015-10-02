var parse = require('xml-parser');

module.exports = Viewer;

function Viewer(xml){
  if (typeof xml != 'string') xml = xml.toString();
  var obj = parse(xml);
  console.log(obj);
}
