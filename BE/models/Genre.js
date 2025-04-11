const fs = require("fs");
const path = require("path");

// tạo model cho genreList.json
module.exports = class genreList {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  // lấy danh sách genre
  static getAllGenres() {
    const genreListPath = path.join(__dirname, "..", "data", "genreList.json");
    const genres = JSON.parse(fs.readFileSync(genreListPath));
    return genres.map((g) => new genreList(g.id, g.name));
  }
};
