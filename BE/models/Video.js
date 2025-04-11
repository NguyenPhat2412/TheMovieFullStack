const fs = require("fs");
const path = require("path");

// tạo model cho videoList.json
module.exports = class videoList {
  constructor(id, title, overview, release_date, poster_path, vote_average) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
  }
  // lấy danh sách video
  static getAllVideos() {
    const videoListPath = path.join(__dirname, "..", "data", "videoList.json");
    const videos = JSON.parse(fs.readFileSync(videoListPath));
    return videos.map(
      (v) =>
        new videoList(
          v.id,
          v.title,
          v.overview,
          v.release_date,
          v.poster_path,
          v.vote_average
        )
    );
  }
};
