import { clearContainer } from '../utils';
import { renderFilmsPage } from '../components/films/filmsContainer';
import { renderFilmDetailsPage } from '../components/films/filmDetails';
import { renderLoginForm } from '../components/auth/logInForm';

function goTo (urlPath) {
  history.pushState(null, null, urlPath);
}

export default function router (nextUrlPath) {
  goTo(nextUrlPath);
  
  const currentPath = location.pathname;

  clearContainer();
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
}
