export function deleteElById(id) {
  const removableEl = document.getElementById(id);
  removableEl.remove();
}

export function addElToParent(tag, parentEl, className, innerText) {
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

export function clearContainer() {
  const container = document.getElementById('container');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function setItemToLS(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function getItemFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function removeItemFromLS(key) {
  localStorage.removeItem(key);
}
