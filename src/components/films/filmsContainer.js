import './filmsContainer.scss';
import { fetchFilms } from '../../requests/requests';
import { createFilmCard } from './filmCard';

export function createFilmsContainer () {
  const filmsContainerEl = document.createElement('div');
  filmsContainerEl.className = 'films-container';
  filmsContainerEl.id = 'filmsContainer';

  return filmsContainerEl;
}

export function fillFilmsContainer (page) {
  const filmsContainerEl = document.getElementById('filmsContainer');
  const promise = fetchFilms(page, 'popularity.desc');
  promise.then((films) => {
    films.forEach(film => {
        const filmCardEl = createFilmCard(film);
        filmsContainerEl.append(filmCardEl);
      });
  });
}
