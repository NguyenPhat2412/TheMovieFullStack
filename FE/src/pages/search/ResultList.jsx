import { useState } from "react";
import MovieDetail from "../browse/MovieDetail";
// import useFetch from "../browse/useFetch";

const ResultList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Nếu click lại vào phim đang mở, thì đóng lại
    } else {
      setSelectedMovie(movie);
    }
  };
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-36 md:w-48 rounded-lg  duration-300  hover:scale-110 cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          />
        ))
      ) : (
        <p className="text-gray-400">No movies available</p>
      )}
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

export default ResultList;
