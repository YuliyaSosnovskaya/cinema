import './filmCard.scss';
import renderByUrlPath from '../../router';
import { changeUrlPath, getUserRole, getItemFromLS, setItemToLS } from '../../utils';
import deleteIcon from '../../img/delete.png';

function cardClickHandler(e) {
  const filmId = e.currentTarget.id;
  changeUrlPath(`/movie/${filmId}`);
  renderByUrlPath();
}

function onDeleteHandler(e) {
  e.stopPropagation();
  const filmEl = e.target.parentNode.parentNode;
  const filmId = Number(filmEl.id);
  const deleteFilmsFromLS = getItemFromLS('deletedFilms') || [];

  if (!deleteFilmsFromLS.includes(filmId)) {
    deleteFilmsFromLS.push(filmId);
  }

  setItemToLS('deletedFilms', deleteFilmsFromLS);
  filmEl.remove();
}

export default function createFilmCard({ posterPath, title, releaseDate, voteAverage, id }) {
  const cardEl = document.createElement('div');
  cardEl.className = 'film-card-el';
  cardEl.id = id;

  const posterEl = document.createElement('img');
  posterEl.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
  posterEl.classList = 'film-card-el__poster';

  const titleEl = document.createElement('span');
  titleEl.className = 'film-card-el__title';
  titleEl.innerText = title;

  cardEl.append(posterEl);
  cardEl.append(titleEl);

  const cardHoverEl = document.createElement('div');
  cardHoverEl.classList = 'film-card-el__hover';

  const isAdmin = getUserRole() === 'admin';
  if (isAdmin) {
    const deleteIconEl = document.createElement('img');
    deleteIconEl.src = deleteIcon;
    deleteIconEl.className = 'film-card-el__hover__delete-icon';
    deleteIconEl.addEventListener('click', onDeleteHandler);
    cardHoverEl.append(deleteIconEl);
  }

  const releaseDateEl = document.createElement('div');
  releaseDateEl.innerText = new Date(releaseDate).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  releaseDateEl.className = 'film-card-el__hover__release-date';

  const voteAverageEl = document.createElement('div');
  voteAverageEl.className = 'film-card-el__hover__vote-average';
  voteAverageEl.innerText = voteAverage;

  cardHoverEl.append(voteAverageEl);
  cardHoverEl.append(releaseDateEl);
  cardEl.append(cardHoverEl);

  cardEl.addEventListener('click', cardClickHandler);

  return cardEl;
}
