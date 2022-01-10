import './filmsContainer.scss';
import { fetchFilms } from '../../requests/requests';
import createFilmCard from './filmCard';
import createPagination from '../pagination/pagination';

export function createFilmsContainer() {
  const filmsContainerEl = document.createElement('div');
  filmsContainerEl.className = 'films-container';
  filmsContainerEl.id = 'filmsContainer';

  return filmsContainerEl;
}

export function fillFilmsContainer(page) {
  const filmsContainerEl = document.getElementById('filmsContainer');
  const promise = fetchFilms(page, 'popularity.desc');
  promise.then((films) => {
    films.forEach((film) => {
      const filmCardEl = createFilmCard({
        posterPath: film.poster_path,
        title: film.title,
        releaseDate: film.release_date,
        voteAverage: film.vote_average,
        id: film.id,
      });
      filmsContainerEl.append(filmCardEl);
    });
  });
}

export function renderFilmsPage(pageNumber) {
  const mainContainer = document.getElementById('mainContainer');

  const filmsContainerEl = createFilmsContainer();
  mainContainer.append(filmsContainerEl);

  fillFilmsContainer(pageNumber);

  const paginationEl = createPagination();
  mainContainer.append(paginationEl);
}
