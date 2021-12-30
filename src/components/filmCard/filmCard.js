import './filmCard.scss';

export function createFilmCard (posterUrl, title, releaseDate, voteAverage) {
  const cardEl = document.createElement('div');
  cardEl.className = 'film-card-el';

  const posterEl = document.createElement('img');
  posterEl.src = posterUrl;
  posterEl.classList = 'film-poster';

  const titleEl = document.createElement('span');
  titleEl.className = 'film-title';
  titleEl.innerText = title;

  cardEl.append(posterEl);
  cardEl.append(titleEl);
  
  const cardHoverEl = document.createElement('div');
  cardHoverEl.classList = 'film-card-el-hover';

  const releaseDateEl = document.createElement('div');
  releaseDateEl.innerText= new Date(releaseDate)
    .toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  releaseDateEl.className = 'release-date';

  const voteAverageEl = document.createElement('div');
  voteAverageEl.className = 'vote-average';
  voteAverageEl.innerText = voteAverage;
  cardHoverEl.append(voteAverageEl);
  cardHoverEl.append(releaseDateEl);
  cardEl.append(cardHoverEl);

  cardEl.addEventListener('mouseenter', function () {
    cardHoverEl.style.opacity= '1';
  });

  cardEl.addEventListener('mouseleave', function () {
    cardHoverEl.style.opacity = '0';
  });

  return cardEl;
}
