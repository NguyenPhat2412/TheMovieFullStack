import { useState } from "react";
import axios from "axios";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    const TOKEN_USER = "8qlOkxz4wq";

    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search`,
        {
          params: {
            token: TOKEN_USER,
            page: 1,
            keyword: query,
            genre,
            mediaType,
            language,
            year,
          },
        }
      );
      onSearch(response.data.results);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm phim:", error);
    }
  };

  const handleReset = () => {
    setQuery("");
    setGenre("");
    setYear("");
    setMediaType("");
    setLanguage("");
  };

  return (
    <div className="flex justify-center ">
      <form
        className="flex flex-col items-end bg-white p-4 rounded-lg shadow-md max-w-fit "
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded w-[500px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Genre (e.g., action)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Media Types</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            <option value="person">Person</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>

        <div className="space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 text-2xl bg-gray-400 text-white rounded-[20px] hover:bg-gray-600 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-2xl bg-blue-500 text-white rounded-[20px] hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
