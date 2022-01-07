import { clearContainer } from '../utils';
import { renderFilmsPage } from '../components/films/filmsContainer';
import { renderFilmDetailsPage } from '../components/films/filmDetails';

export default function router () {
  clearContainer();

  const path = location.pathname;
  if (path === '/') {
    renderFilmsPage(1);
    return;
  }
  if (path.split('/')[1] === 'movie') {
    const filmId = path.split('/')[2];
    renderFilmDetailsPage(filmId);
    return;
  }
}
