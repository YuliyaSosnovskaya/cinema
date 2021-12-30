import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import { createFilmCard } from './components/filmCard/filmCard';

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const filmCardEl = createFilmCard(
  'https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'Spider-Man: No Way Home',
  '2021-12-15',
  8.5
);
rootEl.append(filmCardEl);



