// const API_KEY = "2c1d75cfa8b936fc1419e9a24929d087";

// const BASE_URL = "https://api.themoviedb.org/3";

const BASE_URL_BE = "http://localhost:5000/api/movies";

const TOKEN_USER = "8qlOkxz4wq";

const request = {
  fetchTrending: `${BASE_URL_BE}/trending?token=${TOKEN_USER}&page=1`,
  fetchNetflixOriginals: `${BASE_URL_BE}/netflix?token=${TOKEN_USER}&page=1`,
  fetchTopRated: `${BASE_URL_BE}/top-rate?token=${TOKEN_USER}&page=1`,
  fetchActionMovies: `${BASE_URL_BE}/discover?genre=28&token=${TOKEN_USER}&page=1`,
  fetchComedyMovies: `${BASE_URL_BE}/discover?genre=35&token=${TOKEN_USER}&page=1`,
  fetchHorrorMovies: `${BASE_URL_BE}/discover?genre=27&token=${TOKEN_USER}&page=1`,
  fetchRomanceMovies: `${BASE_URL_BE}/discover?genre=10749&token=${TOKEN_USER}&page=1`,
  fetchDocumentaries: `${BASE_URL_BE}/discover?genre=99&token=${TOKEN_USER}&page=1`,
};

export default request;
