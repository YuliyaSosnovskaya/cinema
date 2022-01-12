import './header.scss';
import IviLogo from '../../img/ivilogo.svg';
import renderByUrlPath from '../../router';
import { getItemFromLS, removeItemFromLS, addElToParent, changeUrlPath } from '../../utils';

export function renderLoginContainer() {
  document.getElementById('loginContainer').remove();
  // eslint-disable-next-line no-use-before-define
  const loginContainerEl = createLoginContainerEl();

  const headerEl = document.getElementById('header');
  headerEl.append(loginContainerEl);
}

function onClickAuthButtonlHandler() {
  const user = getItemFromLS('activeUser');
  if (user) {
    removeItemFromLS('activeUser');
    renderLoginContainer();
  } else {
    changeUrlPath('/sign-in');
    renderByUrlPath();
  }
}

export function createLoginContainerEl() {
  const loginContainerEl = document.createElement('div');
  loginContainerEl.className = 'logIn-container';
  loginContainerEl.id = 'loginContainer';

  const user = getItemFromLS('activeUser');
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
