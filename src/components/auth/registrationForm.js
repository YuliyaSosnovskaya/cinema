import './form.scss';

import { createButton, createFormField } from '../common/formField';
import { addElToParent, changeUrlPath, getItemFromLS, setItemToLS } from '../../utils';
import renderByUrlPath from '../../router';
import { renderLoginContainer } from '../header/header';
import validateRegistrationForm from './validateRegistrationForm';

function onSubmitHandler(e) {
  e.preventDefault();

  const isFormValid = validateRegistrationForm();

  if (isFormValid) {
    const name = document.getElementById('nameInput').value;
    const surname = document.getElementById('surnameInput').value;
    const password = document.getElementById('passwordInput').value;
    const email = document.getElementById('emailInput').value;
    const newUser = {
      name,
      surname,
      email,
      password,
      role: 'user',
    };

    const usersFromLS = getItemFromLS('users');
    usersFromLS.push(newUser);
    setItemToLS('users', usersFromLS);
    setItemToLS('activeUser', newUser);
    renderLoginContainer();
    changeUrlPath('/');
    renderByUrlPath();
  }
}

function clearRegistrationFormHandler(...allID) {
  allID.forEach((id) => {
    const el = document.getElementById(`${id}Input`);
    el.value = '';
    const error = document.getElementById(`${id}Error`);
    error.innerText = '';
  });
}

function createRegistrationForm() {
  const registrationFormEl = document.createElement('form');
  registrationFormEl.className = 'form';
  registrationFormEl.onsubmit = onSubmitHandler;

  addElToParent('div', registrationFormEl, 'title', 'Registration');

  createFormField({
    label: 'name',
    inputType: 'text',
    inputId: 'nameInput',
    errorId: 'nameError',
    formEl: registrationFormEl,
  });

  createFormField({
    label: 'surname',
    inputType: 'text',
    inputId: 'surnameInput',
    errorId: 'surnameError',
    formEl: registrationFormEl,
  });

  createFormField({
    label: 'email',
    inputType: 'text',
    inputId: 'emailInput',
    errorId: 'emailError',
    formEl: registrationFormEl,
  });

  createFormField({
    label: 'password',
    inputType: 'password',
    inputId: 'passwordInput',
    errorId: 'passwordError',
    formEl: registrationFormEl,
  });

  createFormField({
    label: 'confirm password',
    inputType: 'password',
    inputId: 'confirmPasswordInput',
    errorId: 'confirmPasswordError',
    formEl: registrationFormEl,
  });

  const buttonsContainer = addElToParent('div', registrationFormEl, 'form__buttons-container');

  const registrationButton = createButton('submit', 'Sign Up');
  const clearButton = createButton('button', 'Clear');
  clearButton.addEventListener('click', () =>
    clearRegistrationFormHandler('name', 'surname', 'password', 'confirmPassword', 'email'),
  );

  buttonsContainer.append(registrationButton, clearButton);

  return registrationFormEl;
}

export default function renderRegistrationForm() {
  const mainContainer = document.getElementById('mainContainer');
  const registrationForm = createRegistrationForm();
  mainContainer.append(registrationForm);
}
