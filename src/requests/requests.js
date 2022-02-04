const API_KEY = '32afa06669b746e903bf40fdd6480c73';

export async function fetchFilms(page, sortBy) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`,
  );
  const filmsData = await response.json();
  return filmsData.results;
}

export async function fetchFilmDetails(filmId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`,
  );
  const filmDetails = await response.json();
  return filmDetails;
}
