import 'normalize.css/normalize.css';
import './index.scss';
import { filmsArr } from './data';

import { createHeader } from './components/header/header';
import { createFilmsList } from './components/filmsList/filmsList';

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const filmsListEl = createFilmsList(filmsArr);
rootEl.append(filmsListEl);
