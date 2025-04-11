import { useEffect, useState } from "react";
import axios from "./axios";
import request from "./request";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchNetflixOriginals);
      const randomMovie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
      setMovie(randomMovie);
    }

    fetchData();
  }, []);

  return (
    <header
      className="relative h-[450px] text-white flex items-end"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      {/* Nội dung Banner */}
      <div className="relative z-10 p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* Nút bấm */}
        <div className="mt-4 flex space-x-4">
          <button className="px-6 py-2 text-lg bg-white text-black rounded-md font-semibold hover:bg-gray-300 transition">
            Play
          </button>
          <button className="px-6 py-2 text-lg bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition">
            My List
          </button>
        </div>
        <p className="max-w-lg text-sm md:text-lg mt-3 line-clamp-3">
          {movie?.overview}
        </p>
      </div>
    </header>
  );
};

export default Banner;
