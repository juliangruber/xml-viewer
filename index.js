var parse = require('xml-parser');
var fmt = require('util').format;
var h = require('hyperscript');

module.exports = Viewer;

function Viewer(xml){
  if (typeof xml != 'string') xml = xml.toString();
  var obj = parse(xml);
  this._el = this._renderNode(obj.root);
}

Viewer.prototype.appendTo = function(el){
  el.appendChild(this._el);
};

Viewer.prototype._renderNode = function(node){
  var self = this;
  if (!node.children || !node.children.length) return this._renderLeaf(node);
  return h('span',
    renderTagOpen(node),
    node.children.map(function(child){
      var el = self._renderNode(child);
      return h('span',
        h('br'),
        el
      );
    }),
    h('br'),
    renderTagClose(node)
  );
}

Viewer.prototype._renderLeaf = function(node){
  return h('span', renderTagOpen(node) + node.content + renderTagClose(node));
}

function renderTagOpen(node){
  var out = fmt('<%s', node.name);
  Object.keys(node.attributes).forEach(function(key){
    out += fmt(' %s="%s"', key, node.attributes[key]);
  });
  out += '>';
  return out;
}

function renderTagClose(node){
  return fmt('</%s>', node.name);
};
