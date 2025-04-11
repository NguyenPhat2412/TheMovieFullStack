import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./MovieDetail.css";
const API_KEY = "2c1d75cfa8b936fc1419e9a24929d087";

const MovieDetail = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movie) return null;

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const videos = response.data.results;

        // Tìm video Trailer hoặc Teaser trên YouTube
        const trailer =
          videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
          videos.find((v) => v.site === "YouTube" && v.type === "Teaser");

        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setTrailerKey(null);
      }
    };

    fetchTrailer();
  }, [movie]);

  // Cấu hình YouTube player
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (!movie) return null;

  return (
    <div
      className="modal fixed inset-0 bg-transition bg-opacity-100 flex justify-center z-50 items-end max-h-fit "
      // onClick={}
    >
      <div className="bg-gray-900 p-6 rounded-lg w-full relative shadow-lg ">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl hover:text-gray-400"
        >
          ✖
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột trái - Thông tin phim */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-3">
              {movie.title || movie.name}
            </h2>
            <div className="border-t-4 border-white-700 pb-4 mb-4 mt-4 text-white-300">
              <div className="mb-4 mt-2">
                <p className="text-gray-400">
                  <strong>Vote:</strong> {movie.vote_average} / 10
                </p>
                <p className="text-gray-400">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
              </div>
              <p className="text-gray-300 mb-4">{movie.overview}</p>
            </div>
          </div>

          {/* Cột phải - Video hoặc ảnh */}
          <div>
            {trailerKey ? (
              <YouTube
                videoId={trailerKey}
                opts={opts}
                className="rounded-lg"
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                className="rounded-lg w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
