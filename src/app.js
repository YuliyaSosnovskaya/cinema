import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import { createFilmsList } from './components/filmsList/filmsList';
import { fetchFilms } from './requests/requests';

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const promise = fetchFilms(1, 'popularity.desc');
promise.then((films) => {
  const filmsListEl = createFilmsList(films);
  rootEl.append(filmsListEl);
});
