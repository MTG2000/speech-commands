export function buildDOM1(element, obj, useCreateTextNode) {
  if (typeof obj === "string") {
    if (useCreateTextNode) {
      element.appendChild(document.createTextNode(obj));
    } else {
      element.innerHTML += obj;
    }
  } else if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      buildDOM1(element, obj[i], useCreateTextNode);
    }
  } else {
    var e = document.createElement(obj.tag);
    for (var prop in obj) {
      if (prop !== "tag") {
        if (prop === "children") {
          buildDOM1(e, obj[prop], useCreateTextNode);
        } else {
          e.setAttribute(prop, obj[prop]);
        }
      }
    }
    element.appendChild(e);
  }
}
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}
