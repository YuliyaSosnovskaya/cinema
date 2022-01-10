import 'normalize.css/normalize.css';
import './index.scss';

import { createHeader } from './components/header/header';
import router from './router';

window.addEventListener('popstate', router);

const rootEl = document.getElementById('root');
const headerEl = createHeader();
rootEl.append(headerEl);

const container = document.createElement('div');
container.id = 'container';
rootEl.append(container);

router();
