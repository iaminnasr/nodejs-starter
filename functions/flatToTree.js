let unFlatten = function(arr , parentId = null) {
  if(!arr){
    return;
  }
  var children, item, out, _i, _len;
  out = [];
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    item = arr[_i];
    if (item.parentId !== parentId) {
      continue;
    }
    children = unFlatten(arr, item.id);

    if (children.length) {
      item.children = children;
    }
    out.push(item);
  }
  return out;
};


module.exports = unFlatten;
