import './filmsContainer.scss';
import { fetchFilms } from '../../requests/requests';
import createFilmCard from './filmCard';
import createPagination from '../pagination/pagination';
import createSortPanel from '../sort/sort';
import { getSearchParams, getItemFromLS } from '../../utils';
import createSpiner from '../spiner/spiner';

export function createFilmsContainer() {
  const filmsContainerEl = document.createElement('div');
  filmsContainerEl.className = 'films-container';
  filmsContainerEl.id = 'filmsContainer';

  return filmsContainerEl;
}

export function fillFilmsContainer(page) {
  const sortBy = getSearchParams('sortBy') || 'popularity.desc';
  const filmsContainerEl = document.getElementById('filmsContainer');
  const spinerEl = createSpiner();
  filmsContainerEl.append(spinerEl);
  const promise = fetchFilms(page, sortBy);

  const deletedFilmsFromLS = getItemFromLS('deletedFilms');
  promise.then((films) => {
    setTimeout(() => {
      document.getElementById('loader').remove();
      films.forEach((film) => {
        const filmCardEl = createFilmCard({
          posterPath: film.poster_path,
          title: film.title,
          releaseDate: film.release_date,
          voteAverage: film.vote_average,
          id: film.id,
        });

        if (deletedFilmsFromLS) {
          const isFilmDeleted = deletedFilmsFromLS.includes(film.id);
          if (!isFilmDeleted) {
            filmsContainerEl.append(filmCardEl);
          }
        } else {
          filmsContainerEl.append(filmCardEl);
        }
      });
    }, 1000);
  });
}

export function renderFilmsPage(pageNumber) {
  const mainContainer = document.getElementById('mainContainer');

  const sortPanelEl = createSortPanel();
  mainContainer.append(sortPanelEl);

  const filmsContainerEl = createFilmsContainer();
  mainContainer.append(filmsContainerEl);

  fillFilmsContainer(pageNumber);

  const paginationEl = createPagination();
  mainContainer.append(paginationEl);
}
