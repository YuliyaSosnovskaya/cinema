import './spiner.scss';

export default function createSpiner() {
  const spinerEL = document.createElement('div');
  spinerEL.id = 'loader';
  spinerEL.className = 'lds-dual-ring';
  return spinerEL;
}
