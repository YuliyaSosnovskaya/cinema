import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import renderByUrlPath from './router';
import { setItemToLS, getItemFromLS } from './utils';
import users from './users';

window.addEventListener('popstate', renderByUrlPath);

if (!getItemFromLS('users')) {
  setItemToLS('users', users);
}

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const mainContainer = document.createElement('div');
mainContainer.id = 'mainContainer';
rootEl.append(mainContainer);

renderByUrlPath();
