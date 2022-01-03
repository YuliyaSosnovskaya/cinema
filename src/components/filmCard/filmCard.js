import './filmCard.scss';

export function createFilmCard ({posterUrl, title, releaseDate, voteAverage}) {
  const cardEl = document.createElement('div');
  cardEl.className = 'film-card-el';

  const posterEl = document.createElement('img');
  posterEl.src = posterUrl;
  posterEl.classList = 'film-card-el__poster';

  const titleEl = document.createElement('span');
  titleEl.className = 'film-card-el__title';
  titleEl.innerText = title;

  cardEl.append(posterEl);
  cardEl.append(titleEl);
  
  const cardHoverEl = document.createElement('div');
  cardHoverEl.classList = 'film-card-el__hover';

  const releaseDateEl = document.createElement('div');
  releaseDateEl.innerText= new Date(releaseDate)
    .toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  releaseDateEl.className = 'film-card-el__hover__release-date';

  const voteAverageEl = document.createElement('div');
  voteAverageEl.className = 'film-card-el__hover__vote-average';
  voteAverageEl.innerText = voteAverage;
  cardHoverEl.append(voteAverageEl);
  cardHoverEl.append(releaseDateEl);
  cardEl.append(cardHoverEl);

  return cardEl;
}
