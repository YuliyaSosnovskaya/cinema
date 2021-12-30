import './header.scss';
import IviLogo from '../../img/ivilogo.svg';

export function createHeader () {
  const header = document.createElement('header');
  header.className = 'header';
  //logo El
  const logoIcon = document.createElement('img');
  logoIcon.src = IviLogo;
  logoIcon.className = 'logo-icon';
  //sign in/out 
  const logInEl = document.createElement('div');
  logInEl.className = 'logIn-container';
  //user name str
  const userNameEl = document.createElement('span');
  userNameEl.className = 'userName';
  userNameEl.innerText = 'Yuliya |';
  logInEl.append(userNameEl);

  const signButton = document.createElement('div');
  signButton.className = 'sign-button';
  signButton.innerText = 'sign in';
  logInEl.append(signButton);

  header.append(logoIcon);
  header.append(logInEl);

  return header;
}
