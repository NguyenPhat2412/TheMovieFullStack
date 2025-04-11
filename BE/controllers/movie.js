const Movie = require("../models/Movies");
const Video = require("../models/Video");
const GenreList = require("../models/Genre");

// lấy danh sách movie trending
exports.getTrendingMovies = async (req, res) => {
  try {
    const pageSize = 20;
    const page = parseInt(req.query.page) || 1;

    const movies = await Movie.getAllMovies();

    // Sắp xếp theo popularity giảm dần
    const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity);

    const totalPages = Math.ceil(sortedMovies.length / pageSize);

    // Cắt mảng để lấy đúng trang
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const pagedMovies = sortedMovies.slice(start, end);

    res.status(200).json({
      page: page,
      totalPages: totalPages,
      results: pagedMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// lấy các film có rating cao
exports.getTopRatedMovies = async (req, res) => {
  try {
    const pageSize = 20;
    const page = parseInt(req.query.page) || 1;

    const movies = await Movie.getAllMovies();

    // Sắp xếp theo rating giảm dần
    const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);

    const totalPages = Math.ceil(sortedMovies.length / pageSize);

    // Cắt mảng để lấy đúng trang
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const pagedMovies = sortedMovies.slice(start, end);

    res.status(200).json({
      page: page,
      totalPages: totalPages,
      results: pagedMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy các phim theo thể loại
exports.getMoviesByGenre = async (req, res) => {
  const genreParam = req.query.genre;
  const pageSize = 20;
  const page = parseInt(req.query.page) || 1;

  if (!genreParam) {
    return res.status(400).json({ message: "Not found genre parram" });
  }

  const genreId = parseInt(genreParam);
  const allGenres = GenreList.getAllGenres();
  const genreObj = allGenres.find((g) => g.id === genreId);

  if (!genreObj) {
    return res.status(400).json({ message: "Not found that genre id" });
  }

  try {
    const movies = await Movie.getAllMovies();

    // check lỗi
    // const moviesWithGenre28 = movies.filter(
    //   (movie) => movie.genre_ids && movie.genre_ids.includes(99)
    // );
    // console.log(moviesWithGenre28.length);

    // movies.slice(0, 5).forEach((m, i) => {
    //   console.log(`Movie ${i + 1}:`, m.genre_ids);
    // });

    const filteredMovies = movies.filter(
      (movie) =>
        Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreId)
    );

    const sortedMovies = filteredMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );

    const totalPages = Math.ceil(sortedMovies.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const pagedMovies = sortedMovies.slice(start, end);

    res.status(200).json({
      results: pagedMovies,
      page: page,
      total_pages: totalPages,
      genre_name: genreObj.name,
    });
  } catch (error) {
    console.error("Error filtering movies by genre:", error);
    res.status(400).json({ message: "Error processing genre id" });
  }
};

// lấy trailer của một bộ phim
exports.getMovieTrailer = async (req, res) => {
  // Id của phim muốn tìm trailer
  const { film_id } = req.body;

  // kiểm tra nếu không có param film_id
  if (!film_id) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  try {
    const videoTrailer = await Video.getAllVideos();
    const movie = videoTrailer.find((video) => video.id === film_id);
    if (!movie || movie.length === 0 || !movie.videos) {
      return res.status(404).json({ message: "Not found film_id" });
    }

    // lọc các video thỏa mãn yêu cầu
    const filteredVideos = movie.videos.filter(
      (video) =>
        video.official === true &&
        video.site === "Youtube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    );

    if (filteredVideos.length === 0) {
      return res.status(404).json({ message: "Not found film_id" });
    }

    // sắp xếp theo độ phổ biến
    const sortedVideos = filteredVideos.sort(
      (a, b) => b.popularity - a.popularity
    );

    // trả về video phù hợp nhất
    res.status(200).json({
      film_id: film_id,
      video: sortedVideos[0],
    });
  } catch (error) {
    console.error("Not found film_id", error);
    res.status(400).json({ message: "Not found film_id" });
  }
};

// lấy danh sách film theo từ khóa của người dùng nhập vào
exports.getMoviesByKeyword = async (req, res) => {
  const keyword = req.query.keyword || req.query.query;
  const genre = req.query.genre;
  const mediaType = req.query.mediaType;
  const language = req.query.language;
  const year = parseInt(req.query.year);
  const pageSize = 20;
  const page = parseInt(req.query.page) || 1;

  try {
    const movies = await Movie.getAllMovies();
    const filteredMovies = movies.filter((movie) => {
      const matchKeyword = movie.title
        ?.toLowerCase()
        .includes(keyword.toLowerCase());

      const matchGenre = genre
        ? movie.genre_ids.includes(parseInt(genre))
        : true;
      const matchMediaType = mediaType ? movie.media_type === mediaType : true;
      const matchLanguage = language
        ? movie.original_language === language
        : true;
      const matchYear = year
        ? new Date(movie.release_date).getFullYear() === year
        : true;

      return (
        matchKeyword &&
        matchGenre &&
        matchMediaType &&
        matchLanguage &&
        matchYear
      );
    });

    // Sắp xếp theo rating giảm dần
    const sortedMovies = filteredMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );

    const totalPages = Math.ceil(sortedMovies.length / pageSize);

    // Cắt mảng để lấy đúng trang
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const pagedMovies = sortedMovies.slice(start, end);

    res.status(200).json({
      page: page,
      totalPages: totalPages,
      results: pagedMovies,
    });
  } catch (error) {
    console.error("Not found keyword", error);
    res.status(400).json({ message: "Not found keyword parram" });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    res.status(200).json({
      results: movies,
    });
  } catch (error) {
    console.error("Not found all movies", error);
    res.status(400).json({ message: "Not found all movies" });
  }
};
