import { addElToParent, getItemFromLS, setItemToLS } from '../../utils';

function saveHandler() {
  const overviewTextareaEl = document.getElementById('overviewTextarea');
  const newOverview = overviewTextareaEl.value;

  const currentFilmId = window.location.pathname.split('/')[2];
  const editedFilmsFromLS = getItemFromLS('editFilms') || [];

  const editedFilm = editedFilmsFromLS.find((filmFromLS) => filmFromLS.id === currentFilmId);
  if (editedFilm) {
    editedFilm.overview = newOverview;
  } else {
    editedFilmsFromLS.push({ id: currentFilmId, overview: newOverview });
  }

  setItemToLS('editFilms', editedFilmsFromLS);

  const overviewEL = document.getElementById('overview');
  overviewEL.innerText = newOverview;

  const saveButton = document.getElementById('saveButton');
  saveButton.remove();

  const editIconEl = document.getElementById('editIcon');
  editIconEl.style.pointerEvents = 'auto';
}

export default function onClickEditHandler() {
  const editIconEl = document.getElementById('editIcon');
  editIconEl.style.pointerEvents = 'none';

  const overviewEL = document.getElementById('overview');
  const overviewValue = overviewEL.innerText;
  overviewEL.innerText = '';

  const overviewTextareaEl = addElToParent('textarea', overviewEL, 'detail-page__textarea');
  overviewTextareaEl.className = 'detail-page__textarea';
  overviewTextareaEl.id = 'overviewTextarea';
  overviewTextareaEl.value = overviewValue;

  overviewTextareaEl.addEventListener('input', () => {
    overviewTextareaEl.style.height = `${overviewTextareaEl.scrollHeight}px`;
  });
  overviewTextareaEl.style.height = `${overviewTextareaEl.scrollHeight}px`;

  const detailsEl = document.getElementById('details');
  const saveButton = addElToParent('div', detailsEl, 'detail-page__save', 'save');
  saveButton.id = 'saveButton';

  saveButton.addEventListener('click', saveHandler);
}
