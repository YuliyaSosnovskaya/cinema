export function deleteElById (id) {
  const removableEl = document.getElementById(id);
  removableEl.remove();
}

export function addElToParent (tag, parentEl, className, innerText) {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (innerText) {
    el.innerText = innerText;
  }
  parentEl.append(el);
  return el;
}

export function clearContainer () {
  const container = document.getElementById('container');
 
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  };
}

export function goTo(urlPath) {
  history.pushState(null, null, urlPath);
}
