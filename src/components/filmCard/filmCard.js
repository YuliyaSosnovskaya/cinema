import './filmCard.scss';

export function createFilmCard ({poster_path, title, release_date, vote_average}) {
  const cardEl = document.createElement('div');
  cardEl.className = 'film-card-el';

  const posterEl = document.createElement('img');
  posterEl.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  posterEl.classList = 'film-card-el__poster';

  const titleEl = document.createElement('span');
  titleEl.className = 'film-card-el__title';
  titleEl.innerText = title;

  cardEl.append(posterEl);
  cardEl.append(titleEl);
  
  const cardHoverEl = document.createElement('div');
  cardHoverEl.classList = 'film-card-el__hover';

  const releaseDateEl = document.createElement('div');
  releaseDateEl.innerText= new Date(release_date)
    .toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  releaseDateEl.className = 'film-card-el__hover__release-date';

  const voteAverageEl = document.createElement('div');
  voteAverageEl.className = 'film-card-el__hover__vote-average';
  voteAverageEl.innerText = vote_average;
  cardHoverEl.append(voteAverageEl);
  cardHoverEl.append(releaseDateEl);
  cardEl.append(cardHoverEl);

  return cardEl;
}
