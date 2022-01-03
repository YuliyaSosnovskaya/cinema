import './filmsList.scss';
import { createFilmCard } from '../filmCard/filmCard';

export function createFilmsList (filmsArr) {
  const filmsListEl = document.createElement('div');
  filmsListEl.className = 'films-list';

  filmsArr.forEach(film => {
    const filmCardEl = createFilmCard(film);
    filmsListEl.append(filmCardEl);
  });

  return filmsListEl;
}
