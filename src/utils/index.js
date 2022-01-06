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
