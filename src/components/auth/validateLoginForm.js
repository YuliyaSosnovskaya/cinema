import { getItemFromLS } from '../../utils';

const EMPTY_FIELD_ERROR = 'Cannot be empty';
const INVALID_VALUE_ERROR = 'Invalid';

export default function validateLoginForm() {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const errorEmailEl = document.getElementById('emailError');
  const errorPasswordEl = document.getElementById('passwordError');

  if (emailInput.value === '') {
    errorEmailEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  }
  if (errorEmailEl.innerText !== '') {
    errorEmailEl.innerText = '';
  }
  const usersFromLS = getItemFromLS('users');
  const userToLogin = usersFromLS.find((user) => user.email === emailInput.value);
  if (!userToLogin) {
    errorEmailEl.innerText = INVALID_VALUE_ERROR;
    return false;
  }

  const isPasswordRight = userToLogin.password === passwordInput.value;
  if (passwordInput.value === '') {
    errorPasswordEl.innerText = EMPTY_FIELD_ERROR;
    return false;
  }
  if (errorPasswordEl.innerText !== '') {
    errorPasswordEl.innerText = '';
  }

  if (!isPasswordRight) {
    errorPasswordEl.innerText = INVALID_VALUE_ERROR;
    return false;
  }

  return true;
}
