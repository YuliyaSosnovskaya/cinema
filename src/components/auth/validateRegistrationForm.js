import { getItemFromLS } from '../../utils';

const EMPTY_FIELD_ERROR = 'Cannot be empty';
const SHORT_FIELD_ERROR = 'Must be more then 6 symbols';

const EMAIL_REGEXP = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

function validateInputForEmptyAndLength(inputId, errorId, maxLength) {
  const inputValue = document.getElementById(inputId).value;
  const errorEl = document.getElementById(errorId);

  if (inputValue === '') {
    errorEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  }

  if (inputValue.length <= maxLength) {
    errorEl.innerText = SHORT_FIELD_ERROR;
    return false;
  }

  errorEl.innerText = '';
  return true;
}

function validateEmailInput() {
  const emailValue = document.getElementById('emailInput').value;
  const errorEl = document.getElementById('emailError');

  if (emailValue === '') {
    errorEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  }
  if (!EMAIL_REGEXP.test(emailValue)) {
    errorEl.innerText = 'Uncorrect email';
    return false;
  }

  const usersFromLS = getItemFromLS('users');
  const isEmailPresent = usersFromLS.find((user) => user.email === emailValue);

  if (isEmailPresent) {
    errorEl.innerText = 'This email is already in use';
    return false;
  }

  errorEl.innerText = '';
  return true;
}

function validateConfirmPasswordInput() {
  const passwordValue = document.getElementById('passwordInput').value;
  const confirmPasswordValue = document.getElementById('confirmPasswordInput').value;

  const errorEl = document.getElementById('confirmPasswordError');

  if (passwordValue !== confirmPasswordValue) {
    errorEl.innerText = 'Not equal to password';
    return false;
  }

  errorEl.innerText = '';
  return true;
}

export default function validateRegistrationForm() {
  const isNameValid = validateInputForEmptyAndLength('nameInput', 'nameError', 6);
  const isSurnameValid = validateInputForEmptyAndLength('surnameInput', 'surnameError', 6);
  const isPasswordValid = validateInputForEmptyAndLength('passwordInput', 'passwordError', 6);
  const isConfirmPasswordValid = validateConfirmPasswordInput();
  const isEmailValid = validateEmailInput();

  if (isNameValid && isSurnameValid && isPasswordValid && isConfirmPasswordValid && isEmailValid) {
    return true;
  }
  return false;
}
