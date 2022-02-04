import './form.scss';

// import users from '../../users';
import renderByUrlPath from '../../router';
import { setItemToLS, getItemFromLS, addElToParent, changeUrlPath } from '../../utils';
import { renderLoginContainer } from '../header/header';
import { createButton, createFormField } from '../common/formField';
import validateLoginForm from './validateLoginForm';

function onSubmitHandler(e) {
  e.preventDefault();

  const isFormValid = validateLoginForm();
  if (isFormValid) {
    const usersFromLS = getItemFromLS('users');
    const emailInput = document.getElementById('emailInput');
    const userToLogin = usersFromLS.find((user) => user.email === emailInput.value);
    const activeUser = {
      email: userToLogin.email,
      role: userToLogin.role,
      name: userToLogin.name,
    };

    setItemToLS('activeUser', activeUser);
    renderLoginContainer();
    changeUrlPath('/');
    renderByUrlPath();
  }
}

function signUpOnClickHandler() {
  changeUrlPath('/registration');
  renderByUrlPath();
}

export function createLoginForm() {
  const logInFormEl = document.createElement('form');
  logInFormEl.className = 'form';
  logInFormEl.onsubmit = onSubmitHandler;

  createFormField({
    label: 'email',
    inputType: 'text',
    inputId: 'emailInput',
    errorId: 'emailError',
    formEl: logInFormEl,
  });

  createFormField({
    label: 'password',
    inputType: 'password',
    inputId: 'passwordInput',
    errorId: 'passwordError',
    formEl: logInFormEl,
  });

  const buttonsContainer = addElToParent('div', logInFormEl, 'form__buttons-container');

  const signInButton = createButton('submit', 'Sign In');
  const signUpButton = createButton('button', 'Sign Up');
  signUpButton.addEventListener('click', signUpOnClickHandler);
  buttonsContainer.append(signInButton);
  buttonsContainer.append(signUpButton);

  return logInFormEl;
}

export function renderLoginForm() {
  const mainContainer = document.getElementById('mainContainer');
  const logInForm = createLoginForm();
  mainContainer.append(logInForm);
}
