import { renderFilmsPage } from '../components/films/filmsContainer';
import { renderFilmDetailsPage } from '../components/films/filmDetails';
import { renderLoginForm } from '../components/auth/logInForm';
import { clearMainContainer } from '../utils';

export default function renderByRouter() {
  const currentPath = window.location.pathname;

  clearMainContainer();
  if (currentPath === '/') {
    renderFilmsPage(1);
    return;
  }
  if (currentPath.split('/')[1] === 'movie') {
    const filmId = currentPath.split('/')[2];
    renderFilmDetailsPage(filmId);
    return;
  }
  if (currentPath === '/sign-in') {
    renderLoginForm();
  }
}
