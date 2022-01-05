import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import { createFilmsContainer, fillFilmsContainer } from './components/films/filmsContainer';
import { createPagination } from './components/pagination/pagination';

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const filmsContainerEl = createFilmsContainer();
rootEl.append(filmsContainerEl);

fillFilmsContainer(1);

const paginationEl = createPagination();
rootEl.append(paginationEl);
