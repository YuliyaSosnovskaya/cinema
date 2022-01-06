import './pagination.scss';
import { fillFilmsContainer } from '../films/filmsContainer';

const ACTIVE_CLASS = 'pagination-el__active';

export function createPagination () {

  const paginationContainerEl = document.createElement('div');
  paginationContainerEl.className = 'pagination-container';
  paginationContainerEl.id = 'paginationContainer';
  
  const arrowLeft = createPaginationEl('\u276E');
  arrowLeft.addEventListener('click', (e) => arrowHandler(e, 'left'));
  paginationContainerEl.append(arrowLeft);
  
  for (let i = 1; i <= 10; i++) {
    const paginationEl = createPaginationEl(String(i));
    paginationEl.addEventListener('click', changePageHandler);
    paginationContainerEl.append(paginationEl);
  }

  const arrowRight = createPaginationEl('\u276F');
  arrowRight.addEventListener('click', (e) => arrowHandler(e, 'right'));
  paginationContainerEl.append(arrowRight);

  // const eFirst = createPaginationEL('...');
  // const eLast = createPaginationEL('...'); 
  
  return paginationContainerEl;
}

function createPaginationEl (page) {
  const isFirstPage = page === '1';
  // const isEllipsis = page === '...';
  const paginationEl = document.createElement('div');
  paginationEl.classList = 'pagination-el';

  // if(isEllipsis) {
  //   paginationEl.classList.add('pagination-el__ellipsis');
  // }

  if (isFirstPage) {
    paginationEl.classList.add(ACTIVE_CLASS);
  }

  paginationEl.innerText = page;

  return paginationEl;
}

function changePageHandler (event) {
  const currentPageEl = document.getElementsByClassName(ACTIVE_CLASS)[0];
  const currentPageNumber = currentPageEl.innerText;
  const nextPageEl = event.currentTarget;
  const nextPageNumber = nextPageEl.innerText;

  if (currentPageNumber === nextPageNumber) {
    return;
  }

  refreshFilms(nextPageNumber);

  currentPageEl.classList.remove(ACTIVE_CLASS);
  nextPageEl.classList.add(ACTIVE_CLASS);
}

function arrowHandler (event, direction) {
  const paginationContainer = document.getElementsByClassName('pagination-container')[0];
  const currentPageEl = document.getElementsByClassName(ACTIVE_CLASS)[0];
  const currentPageNumber = Number(currentPageEl.innerText);
  const paginationArr = paginationContainer.getElementsByClassName('pagination-el');

  const currentPageIndex = [...paginationArr].findIndex((el) => el.innerText == currentPageNumber);

  if (direction === 'left' && currentPageNumber !== 1) {
    const leftPageEl = paginationArr[currentPageIndex - 1];
    leftPageEl.classList.add(ACTIVE_CLASS); 
    currentPageEl.classList.remove(ACTIVE_CLASS);
    refreshFilms(currentPageIndex - 1);
  }

  if (direction === 'right' && currentPageNumber !== 10){
    const rightPageEl = paginationArr[currentPageIndex + 1]
    rightPageEl.classList.add(ACTIVE_CLASS); 
    currentPageEl.classList.remove(ACTIVE_CLASS);
    refreshFilms(currentPageIndex + 1);
  }
}

 function refreshFilms (pageNumber) {
  const filmsContainerEl = document.getElementById('filmsContainer');

  while (filmsContainerEl.firstChild) {
    filmsContainerEl.removeChild(filmsContainerEl.firstChild);
  };

  fillFilmsContainer(pageNumber);
}
