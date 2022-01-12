import { renderFilmsPage } from '../components/films/filmsContainer';
import { renderFilmDetailsPage } from '../components/films/filmDetails';
import { renderLoginForm } from '../components/auth/logInForm';
import { clearMainContainer } from '../utils';
import renderRegistrationForm from '../components/auth/registrationForm';

export default function renderByUrlPath() {
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
    return;
  }
  if (currentPath === '/registration') {
    renderRegistrationForm();
  }
}
