import './filmDetails.scss';
import { addElToParent } from '../../utils';
import { fetchFilmDetails } from '../../requests/requests';

export function createFilmDetailsPage ({
  overview,
  genres, 
  original_title,
  // popularity, 
  release_date, 
  title, 
  vote_average, 
  vote_count, 
  budget, 
  runtime, 
  poster_path
}) {
  const detailPageEl = document.createElement('div');
  detailPageEl.className = 'detail-page';

  const filmPart = addElToParent('div', detailPageEl, 'detail-page__film-part');

  const posterEl = addElToParent('img', filmPart, 'detail-page__poster');
  posterEl.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const detailsEl = addElToParent('div', filmPart, 'detail-page__details-el');

  addElToParent('div', detailsEl, 'detail-page__title', title);
  addElToParent('span', detailsEl, 'detail-page__title__original-title', original_title);
  addElToParent('div', detailsEl, 'detail-page__title__advertising', 'watch 14 days for $1');

  const aboutPart = addElToParent('div', detailsEl, 'detail-page__about', 'About movie');

  const aboutMovieTableEl = createAboutMovieTable(release_date, overview, genres, runtime, budget);
  aboutPart.append(aboutMovieTableEl);
 
  const ratingPart = addElToParent('div', detailPageEl, 'detail-page__rating-part');
  addElToParent('div', ratingPart, 'detail-page__rating-part__vote-average', vote_average.toFixed(1));
  addElToParent('div', ratingPart, 'detail-page__rating-part__votes', `${vote_count} votes`);

  return detailPageEl;
}

function createAboutMovieTable (release_date, overview, genres, runtime, budget) {
  const releaseDate = new Date(release_date)
    .toLocaleDateString('en-En', { year: 'numeric', month: 'long', day: 'numeric' });
  const genresStr = genres.map((genre) => genre.name).join(', ');
  const duration = `${runtime} min`; 
  const budgetStr = `$${budget}`;

  const table = document.createElement('table');
  table.className = 'detail-page__about__table';

  const releaseDateRow = createDetailRow('realise date', releaseDate);
  table.append(releaseDateRow);

  const overviewRow = createDetailRow('overview', overview);
  table.append(overviewRow);

  const genresRow = createDetailRow('genres', genresStr);
  table.append(genresRow);

  const durationRow = createDetailRow('duration', duration);
  table.append(durationRow);
  
  const budgetRow = createDetailRow('budget', budgetStr);
  table.append(budgetRow);

  return table;
}

function createDetailRow(key, value) {
  const tr = document.createElement('tr');
  addElToParent('td', tr, '', key);
  addElToParent('td', tr, '', value);
  return tr;
}

export function renderFilmDetailsPage(filmId) {
  const container = document.getElementById('container');
 
  const filmDetailsPromise = fetchFilmDetails(filmId);
  filmDetailsPromise.then((details) => {
    const filmDetailsPageEl = createFilmDetailsPage(details);
    container.append(filmDetailsPageEl);
  });
}
