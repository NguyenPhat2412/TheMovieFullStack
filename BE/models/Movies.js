const fs = require("fs");
const path = require("path");

// taọ model cho movieList.json
module.exports = class movieList {
  constructor(
    id,
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    genre_ids,
    backdrop_path
  ) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
    this.genre_ids = genre_ids;
    this.backdrop_path = backdrop_path;
  }
  // lấy danh sách movie
  static getAllMovies() {
    const movieListPath = path.join(__dirname, "..", "data", "movieList.json");
    const movies = JSON.parse(fs.readFileSync(movieListPath));
    return movies.map(
      (m) =>
        new movieList(
          m.id,
          m.title,
          m.overview,
          m.release_date,
          m.poster_path,
          m.vote_average,
          m.genre_ids,
          m.backdrop_path
        )
    );
  }
};
