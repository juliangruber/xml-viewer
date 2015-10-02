var parse = require('xml-parser');
var fmt = require('util').format;
var h = require('hyperscript');

module.exports = Viewer;

function Viewer(xml){
  if (typeof xml != 'string') xml = xml.toString();
  var obj = parse(xml);
  this._el = this._renderRoot(obj);
  this._selection = null;
}

Viewer.prototype.appendTo = function(el){
  el.appendChild(this._el);
};

Viewer.prototype.getSelection = function(){
  return this._selection;
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

Viewer.prototype._renderNode = function(node, indent){
  var self = this;
  indent = indent || 0;

  if (!node.children || !node.children.length) return this._renderLeaf(node, indent);

  function onclick(ev){
    ev.stopPropagation();
    self._selection = node;
  }

  return h('span',
    { onclick: onclick },
    tabs(indent),
    renderTagOpen(node),
    node.children.map(function(child){
      var el = self._renderNode(child, indent + 1);
      return h('span',
        h('br'),
        el
      );
    }),
    h('br'),
    tabs(indent),
    renderTagClose(node)
  );
}

Viewer.prototype._renderLeaf = function(node, indent){
  var self = this;

  function onclick(ev){
    ev.stopPropagation();
    self._selection = node;
  }

  return h('span',
    { onclick: onclick },
    tabs(indent),
    renderTagOpen(node) + node.content + renderTagClose(node)
  );
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

function createTab(){
  var tab = document.createElement('span');
  tab.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;'; // hackedy hack
  return tab;
}

function tabs(n){
  var out = [];
  for (var i = 0; i < n; i++) out.push(createTab());
  return out;
}
