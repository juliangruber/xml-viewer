var parse = require('xml-parser');
var fmt = require('util').format;
var h = require('hyperscript');

module.exports = Viewer;

function Viewer(xml){
  if (typeof xml != 'string') xml = xml.toString();
  var obj = parse(xml);
  console.log('obj', obj);
  this._el = this._renderRoot(obj);
}

Viewer.prototype.appendTo = function(el){
  el.appendChild(this._el);
};

Viewer.prototype._renderRoot = function(node){
  return h('span',
    renderTagOpen({
      name: 'xml',
      attributes: node.declaration.attributes
    }, true),
    h('br'),
    this._renderNode(node.root)
  );
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

function renderTagOpen(node, declaration){
  var out = '<';
  if (declaration) out += '?';
  out += node.name;
  Object.keys(node.attributes).forEach(function(key){
    out += fmt(' %s="%s"', key, node.attributes[key]);
  });
  if (declaration) out += '?';
  out += '>';
  return out;
}

function renderTagClose(node){
  return fmt('</%s>', node.name);
};
