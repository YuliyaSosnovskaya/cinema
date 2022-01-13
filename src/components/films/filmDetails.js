import './filmDetails.scss';
import editIcon from '../../img/pen.png';
import { addElToParent, getUserRole, getItemFromLS } from '../../utils';
import { fetchFilmDetails } from '../../requests/requests';
import createAboutMovieTable from './filmAboutTable';
import onClickEditHandler from './editHandler';

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
  const isAdmin = getUserRole() === 'admin';

  const detailPageEl = document.createElement('div');
  detailPageEl.className = 'detail-page';

  const filmPart = addElToParent('div', detailPageEl, 'detail-page__film-part');
  filmPart.id = 'filmPart';

  const posterEl = addElToParent('img', filmPart, 'detail-page__poster');
  posterEl.src = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const detailsEl = addElToParent('div', filmPart, 'detail-page__details-el');
  detailsEl.id = 'details';

  addElToParent('div', detailsEl, 'detail-page__title', title);
  addElToParent('span', detailsEl, 'detail-page__title__original-title', originalTitle);
  addElToParent('div', detailsEl, 'detail-page__title__advertising', 'watch 14 days for $1');

  const aboutPart = addElToParent('div', detailsEl, 'detail-page__about');
  const abouMovieHeader = addElToParent(
    'div',
    aboutPart,
    'detail-page__abouMovieHeader',
    'About movie',
  );

  const aboutMovieTableEl = createAboutMovieTable(releaseDate, overview, genres, runtime, budget);
  aboutPart.append(aboutMovieTableEl);

  if (isAdmin) {
    const editIconEl = addElToParent('img', abouMovieHeader, 'detail-page__edit-icon');
    editIconEl.id = 'editIcon';
    editIconEl.src = editIcon;

    editIconEl.addEventListener('click', onClickEditHandler);
  }

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

function getEditedFilmFromLS(filmId) {
  const editedFilmsFromLS = getItemFromLS('editFilms') || [];

  const editedEl = editedFilmsFromLS.find((filmFromLS) => filmFromLS.id === filmId);
  if (editedEl) {
    return editedEl;
  }

  return null;
}

export function renderFilmDetailsPage(filmId) {
  const mainContainer = document.getElementById('mainContainer');

  const editedFilmFromLs = getEditedFilmFromLS(filmId);
  const editedOverview = editedFilmFromLs?.overview;

  const filmDetailsPromise = fetchFilmDetails(filmId);
  filmDetailsPromise.then((details) => {
    const filmDetailsPageEl = createFilmDetailsPage({
      overview: editedOverview || details.overview,
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

    mainContainer.append(filmDetailsPageEl);
  });
}
