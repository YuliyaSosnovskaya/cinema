import './logInForm.scss';
import users from '../../users';
import router from '../../router';
import { setItemToLS, addElToParent } from '../../utils';
import { renderLoginContainer } from '../header/header';

const EMPTY_FIELD_ERROR = 'Cannot be empty';
const INVALID_VALUE_ERROR = 'Invalid';

function validateForm() {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const errorEmailEl = document.getElementById('emailError');
  const errorPasswordEl = document.getElementById('passwordError');

  if (emailInput.value === '') {
    errorEmailEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  } else if (errorEmailEl.innerText !== '') {
    errorEmailEl.innerText = '';
  }

  const userToLogin = users.find((user) => user.email === emailInput.value);
  if (!userToLogin) {
    errorEmailEl.innerText = INVALID_VALUE_ERROR;
    return false;
  }

  const isPasswordRight = userToLogin.password === passwordInput.value;
  if (passwordInput.value === '') {
    errorPasswordEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  } else if (errorPasswordEl.innerText !== '') {
    errorPasswordEl.innerText = '';
  }

  if (!isPasswordRight) {
    errorPasswordEl.innerText = INVALID_VALUE_ERROR;
    return false;
  }

  return true;
}
function onSubmitHandler(e) {
  e.preventDefault();

  const isFormValid = validateForm();
  if (isFormValid) {
    const emailInput = document.getElementById('emailInput');
    const userToLogin = users.find((user) => user.email === emailInput.value);
    const activeUser = {
      email: userToLogin.email,
      role: userToLogin.role,
      name: userToLogin.name,
    };

    setItemToLS('user', activeUser);
    renderLoginContainer();
    router('/');
  }
}
function createLabel(innerText, id) {
  const label = document.createElement('label');
  label.className = 'logIn-form__input-label';
  label.for = id;
  label.innerText = innerText;
  return label;
}

function createInput(type, id) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  return input;
}

function createError(innerText, id) {
  const error = document.createElement('span');
  error.innerText = innerText;
  error.className = 'logIn-form__error';
  error.id = id;
  return error;
}

function createButton(type, innerText) {
  const button = document.createElement('button');
  button.className = 'button';
  button.type = type;
  button.innerText = innerText;
  return button;
}

export function createLoginForm() {
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

export function renderLoginForm() {
  const container = document.getElementById('container');
  const logInForm = createLoginForm();
  container.append(logInForm);
}
