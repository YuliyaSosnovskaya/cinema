function createLabel({ innerText, forInput }) {
  const label = document.createElement('label');
  label.className = 'form__input-label';
  label.setAttribute('for', forInput);
  label.innerText = innerText;
  return label;
}

function createInput({ type, elId }) {
  const input = document.createElement('input');
  input.type = type;
  input.id = elId;
  return input;
}

function createError({ elId }) {
  const error = document.createElement('span');
  error.innerText = '';
  error.className = 'form__error';
  error.id = elId;
  return error;
}

export function createButton(type, innerText) {
  const button = document.createElement('button');
  button.className = 'button';
  button.type = type;
  button.innerText = innerText;
  return button;
}

export function createFormField({ label, inputType, inputId, errorId, formEl }) {
  const nameLabel = createLabel({ innerText: label, forInput: inputId });
  formEl.append(nameLabel);

  const nameInput = createInput({ type: inputType, elId: inputId });
  formEl.append(nameInput);

  const nameError = createError({ elId: errorId });
  formEl.append(nameError);
}
