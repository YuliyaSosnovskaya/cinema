import './filmDetails.scss';
import { addElToParent } from '../../utils';
import { fetchFilmDetails } from '../../requests/requests';

function createDetailRow(key, value) {
  const tr = document.createElement('tr');
  addElToParent('td', tr, '', key);
  addElToParent('td', tr, '', value);
  return tr;
}

function createAboutMovieTable(releaseDate, overview, genres, runtime, budget) {
  const formatReleaseDate = new Date(releaseDate).toLocaleDateString('en-En', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const genresStr = genres.map((genre) => genre.name).join(', ');
  const duration = `${runtime} min`;
  const budgetStr = `$${budget}`;

  const table = document.createElement('table');
  table.className = 'detail-page__about__table';

  const releaseDateRow = createDetailRow('realise date', formatReleaseDate);
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
export function createFilmDetailsPage({
  overview,
  genres,
  originalTitle,
  // popularity,
  releaseDate,
  title,
  voteAverage,
  voteCount,
  budget,
  runtime,
  posterPath,
}) {
  const detailPageEl = document.createElement('div');
  detailPageEl.className = 'detail-page';

  const filmPart = addElToParent('div', detailPageEl, 'detail-page__film-part');

  const posterEl = addElToParent('img', filmPart, 'detail-page__poster');
  posterEl.src = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const detailsEl = addElToParent('div', filmPart, 'detail-page__details-el');

  addElToParent('div', detailsEl, 'detail-page__title', title);
  addElToParent('span', detailsEl, 'detail-page__title__original-title', originalTitle);
  addElToParent('div', detailsEl, 'detail-page__title__advertising', 'watch 14 days for $1');

  const aboutPart = addElToParent('div', detailsEl, 'detail-page__about', 'About movie');

  const aboutMovieTableEl = createAboutMovieTable(releaseDate, overview, genres, runtime, budget);
  aboutPart.append(aboutMovieTableEl);

  const ratingPart = addElToParent('div', detailPageEl, 'detail-page__rating-part');
  addElToParent(
    'div',
    ratingPart,
    'detail-page__rating-part__vote-average',
    voteAverage.toFixed(1),
  );
  addElToParent('div', ratingPart, 'detail-page__rating-part__votes', `${voteCount} votes`);

  return detailPageEl;
}

export function renderFilmDetailsPage(filmId) {
  const container = document.getElementById('container');

  const filmDetailsPromise = fetchFilmDetails(filmId);
  filmDetailsPromise.then((details) => {
    const filmDetailsPageEl = createFilmDetailsPage({
      overview: details.overview,
      genres: details.genres,
      originalTitle: details.original_title,
      // popularity: details.popularity,
      releaseDate: details.release_date,
      title: details.title,
      voteAverage: details.vote_average,
      voteCount: details.vote_count,
      budget: details.budget,
      runtime: details.runtime,
      posterPath: details.poster_path,
    });
    container.append(filmDetailsPageEl);
  });
}
