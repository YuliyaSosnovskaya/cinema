import './logInForm.scss';
import users from '../../users';
import router from '../../router';
import { setItemToLS, addElToParent } from '../../utils';
import { renderLoginContainer } from '../header/header';

export function createLoginForm () {
  const logInFormEl = document.createElement('form');
  logInFormEl.className = 'logIn-form';
  logInFormEl.onsubmit = onSubmitHandler;

  const emailLabel = createLabel('user name', 'emailLabel');
  logInFormEl.append(emailLabel);

  const emailInput = createInput('text', 'emailInput');
  logInFormEl.append(emailInput);
  
  const emailError = createError('', 'emailError');
  logInFormEl.append(emailError);

  const passwordLabel = createLabel('password', 'passwordInput');
  logInFormEl.append(passwordLabel);
  
  const passwordInput = createInput('password', 'passwordInput');
  logInFormEl.append(passwordInput);
  
  const passwordError = createError('', 'passwordError');
  logInFormEl.append(passwordError);


  const buttonsContainer = addElToParent('div', logInFormEl, 'logIn-form__buttons-container');

  const signInButton = createButton('submit', 'Sign In');
  const signUpButton = createButton('button', 'Sign Up');
  buttonsContainer.append(signInButton);
  buttonsContainer.append(signUpButton);

  return logInFormEl;
}

function createLabel (innerText, id) {
  const label = document.createElement('label');
  label.className = 'logIn-form__input-label';
  label.for = id;
  label.innerText = innerText;
  return label;
}

function createInput (type, id) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  return input;
}

function createError (innerText, id) {
  const error = document.createElement('span');
  error.innerText = innerText;
  error.className = 'logIn-form__error';
  error.id = id;
  return error;
}

function createButton (type, innerText) {
  const button = document.createElement('button');
  button.className = 'button';
  button.type = type;
  button.innerText = innerText;
  return button;
}

function onSubmitHandler (e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('emailInput');
  const passwordInput =  document.getElementById('passwordInput');

  const userToLogin = users.find((user) => user.email === nameInput.value);
  const isPasswordRight =  userToLogin.password === passwordInput.value;

  if (userToLogin && isPasswordRight) {
    const activeUser = {
      email: userToLogin.email,
      role: userToLogin.role,
      name: userToLogin.name
    };

    setItemToLS('user', activeUser);
    renderLoginContainer();

    router('/');
  }
}

export function renderLoginForm () {
  const container = document.getElementById('container');
  const logInForm = createLoginForm();
  container.append(logInForm);
}
