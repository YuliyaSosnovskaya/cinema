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

export function clearMainContainer() {
  const mainContainer = document.getElementById('mainContainer');

  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
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

export function changeUrlPath(urlPath) {
  window.history.pushState(null, null, urlPath);
}
