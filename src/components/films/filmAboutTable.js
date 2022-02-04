import { addElToParent } from '../../utils';

function createDetailRow(key, value) {
  const tr = document.createElement('tr');
  addElToParent('td', tr, '', key);
  const el = addElToParent('td', tr, '', value);
  el.id = key;
  return tr;
}

export default function createAboutMovieTable(releaseDate, overview, genres, runtime, budget) {
  const formatReleaseDate = new Date(releaseDate).toLocaleDateString('en-En', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const genresStr = genres.map((genre) => genre.name).join(', ');
  const duration = `${runtime} min`;
  const budgetStr = `$${budget}`;

  const table = document.createElement('table');
  table.className = 'detail-page__about__table';

  const releaseDateRow = createDetailRow('realise date', formatReleaseDate);
  table.append(releaseDateRow);

  const overviewRow = createDetailRow('overview', overview);
  table.append(overviewRow);

  const genresRow = createDetailRow('genres', genresStr);
  table.append(genresRow);

  const durationRow = createDetailRow('duration', duration);
  table.append(durationRow);

  const budgetRow = createDetailRow('budget', budgetStr);
  table.append(budgetRow);

  return table;
}
