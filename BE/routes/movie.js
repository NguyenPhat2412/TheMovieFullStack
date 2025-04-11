const express = require("express");
const Movie = require("../models/Movies");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

// lấy controller cho movie trending
const movieController = require("../controllers/movie");

// lấy danh sách movie trending
router.get("/trending", authenticateToken, movieController.getTrendingMovies);

// lấy danh sách movie có rating cao
router.get("/top-rate", authenticateToken, movieController.getTopRatedMovies);

// Lấy các phim theo thể loại
router.get("/discover", authenticateToken, movieController.getMoviesByGenre);

// lấy trailer của bộ phim
router.post("/video", authenticateToken, movieController.getMovieTrailer);

// lấy danh sách theo từ khóa của người dùng nhập vào
router.get("/search", authenticateToken, movieController.getMoviesByKeyword);

// lấy danh sách thông tin toàn bộ movie
router.get("/netflix", authenticateToken, movieController.getAllMovies);

module.exports = router;
