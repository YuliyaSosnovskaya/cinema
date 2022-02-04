import './sort.scss';
import { setSearchParams, getSearchParams, deleteSearchParams } from '../../utils';
import { createFilmsContainer, fillFilmsContainer } from '../films/filmsContainer';
import createPagination from '../pagination/pagination';

const SORT_OPTIONS = [
  {
    label: 'Popular',
    id: 'popularity.desc',
  },
  {
    label: 'Revenue',
    id: 'revenue.desc',
  },
  {
    label: 'Vote count',
    id: 'vote_count.desc',
  },
];

let isOptionsOpen = false;

function rerenderFilmsContainer() {
  document.getElementById('filmsContainer').remove();
  document.getElementById('paginationContainer').remove();

  const mainContainer = document.getElementById('mainContainer');
  const filmsContainerEl = createFilmsContainer();
  mainContainer.append(filmsContainerEl);
  fillFilmsContainer(1);
  const paginationEl = createPagination();
  mainContainer.append(paginationEl);
}

function openCloseOptionsHandler() {
  const optionsContainerEl = document.getElementById('optionsContainer');
  optionsContainerEl.style.display = isOptionsOpen ? 'none' : 'block';

  isOptionsOpen = !isOptionsOpen;
}

function createSort() {
  const sortBySearchParam = getSearchParams('sortBy');

  let selectedOption = SORT_OPTIONS.find((o) => o.id === sortBySearchParam) || SORT_OPTIONS[0];

  const dropdawnContainer = document.createElement('div');
  dropdawnContainer.className = 'sort-panel__dropdawn-container';

  const selectEl = document.createElement('div');
  selectEl.className = 'sort-panel__select';
  selectEl.innerText = selectedOption.label;
  selectEl.addEventListener('click', openCloseOptionsHandler);

  const optionsContainer = document.createElement('div');
  optionsContainer.id = 'optionsContainer';
  optionsContainer.className = 'sort-panel__options-container';

  dropdawnContainer.append(selectEl);
  dropdawnContainer.append(optionsContainer);

  let selectedOptionEl = null;

  SORT_OPTIONS.forEach((option) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'sort-panel__option';
    optionEl.innerText = option.label;
    optionsContainer.append(optionEl);

    if (selectedOptionEl === null && selectedOption.label === option.label) {
      selectedOptionEl = optionEl;
      selectedOptionEl.classList.add('sort-panel__option__active');
    }

    optionEl.addEventListener('click', () => {
      if (selectedOptionEl !== optionEl) {
        selectedOption = option;
        selectEl.innerText = selectedOption.label;
        selectedOptionEl.classList.remove('sort-panel__option__active');
        selectedOptionEl = optionEl;
        selectedOptionEl.classList.add('sort-panel__option__active');
        if (selectedOption.label === SORT_OPTIONS[0].label) {
          deleteSearchParams('sortBy');
        } else {
          setSearchParams('sortBy', selectedOption.id);
        }
        rerenderFilmsContainer();
      }
      openCloseOptionsHandler();
    });
  });

  return dropdawnContainer;
}

export default function createSortPanel() {
  const sortPanelEl = document.createElement('div');
  sortPanelEl.className = 'sort-panel';
  const sortDropdawn = createSort();
  sortPanelEl.append(sortDropdawn);

  return sortPanelEl;
}
