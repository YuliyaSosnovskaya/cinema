import './filmCard.scss';
import router from '../../router';

function cardClickHandler(e) {
  const filmId = e.currentTarget.id;
  router(`/movie/${filmId}`);
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
