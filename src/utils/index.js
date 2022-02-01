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

export function getUserRole() {
  const activeUser = getItemFromLS('activeUser');
  if (activeUser) {
    return activeUser.role;
  }
  return 'guest';
}
export function getSearchParams(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function deleteSearchParams(key) {
  const params = new URLSearchParams(window.location.search);
  params.delete(key);
  const { origin, pathname } = document.location;
  window.history.pushState({}, '', `${origin}${pathname}?${params.toString()}`);
}

export function setSearchParams(key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  const { origin, pathname } = document.location;
  const url = `${origin}${pathname}?${params.toString()}`;

  window.history.pushState({ [key]: value }, '', url);
}
