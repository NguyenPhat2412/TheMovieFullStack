import { useState } from "react";
import useFetch from "./useFetch";
import MovieDetail from "./MovieDetail";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Row = ({ title, fetchUrl }) => {
  const { data: movies, loading, error } = useFetch(fetchUrl);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Nếu click lại vào phim đang mở, thì đóng lại
    } else {
      setSelectedMovie(movie);
    }
  };

  if (loading)
    return <p className="text-gray-400 text-lg">Loading {title}...</p>;
  if (error)
    return (
      <p className="text-red-500 text-lg">
        Error loading {title}: {error}
      </p>
    );

  return (
    <div className="px-6 py-4">
      <h2 className="text-white text-2xl font-semibold mb-3">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="w-36 md:w-48 rounded-lg transition-transform duration-300 transform hover:scale-110 cursor-pointer"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title || movie.name}
            onClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>

      {/* Hiển thị MovieDetail khi có phim được chọn */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          selectedMovie={selectedMovie}
        />
      )}
    </div>
  );
};

export default Row;
