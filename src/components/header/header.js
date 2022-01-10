import './header.scss';
import IviLogo from '../../img/ivilogo.svg';
import router from '../../router';
import { getItemFromLS, removeItemFromLS, addElToParent } from '../../utils';

export function renderLoginContainer() {
  document.getElementById('loginContainer').remove();
  const loginContainerEl = createLoginContainerEl();

  const headerEl = document.getElementById('header');
  headerEl.append(loginContainerEl);
}

function onClickAuthButtonlHandler() {
  const user = getItemFromLS('user');
  if (user) {
    removeItemFromLS('user');
    renderLoginContainer();
  } else {
    router('/sign-in');
  }
}

export function createLoginContainerEl() {
  const loginContainerEl = document.createElement('div');
  loginContainerEl.className = 'logIn-container';
  loginContainerEl.id = 'loginContainer';

  const user = getItemFromLS('user');
  if (user) {
    addElToParent('span', loginContainerEl, 'userName', user.name);
  }

  const authBtnInnerText = user ? 'Log Out' : 'Sign In / Sign Up';
  const authButton = addElToParent('div', loginContainerEl, 'auth-button', authBtnInnerText);
  authButton.addEventListener('click', onClickAuthButtonlHandler);

  return loginContainerEl;
}

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'header';

  const logoIcon = document.createElement('img');
  logoIcon.src = IviLogo;
  logoIcon.className = 'logo-icon';
  header.append(logoIcon);

  const loginContainerEl = createLoginContainerEl();
  header.append(loginContainerEl);

  return header;
}
