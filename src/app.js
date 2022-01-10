import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import renderByRouter from './router';

window.addEventListener('popstate', renderByRouter);

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const mainContainer = document.createElement('div');
mainContainer.id = 'mainContainer';
rootEl.append(mainContainer);

renderByRouter();
