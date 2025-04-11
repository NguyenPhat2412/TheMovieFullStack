// import React from 'react';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "./Row";
import request from "./request";
import Banner from "./banner";

function Browse() {
  const [isScrolled, setIsScrolled] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Banner - hinh anh nen
    <div className="bg-black">
      <nav
        className={`navbar fixed-top p-5 transition-all duration-300 ${
          isScrolled ? "bg-black" : "bg-transition"
        }`}
      >
        <div className="container flex justify-between items-center">
          {/*Logo - dieu huong ve trang chu */}
          <Link
            to="/"
            className="text text-red-400 text-2xl font-bold cursor-pointer pl-6"
          >
            Movie App
          </Link>
          {/*Search - dieu huong den trang tim kiem */}
          <Link
            to="/search"
            className="text text-white cursor-pointer "
            style={{ transform: "translateX(300px)" }}
          >
            <svg
              className="w-6 h-6"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </Link>
        </div>
      </nav>
      <Banner />
      <div className="browse">
        <Row
          title="Netflix Originals"
          fetchUrl={request.fetchNetflixOriginals}
        />
        <Row title="Trending Now" fetchUrl={request.fetchTrending} />

        <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
      </div>
    </div>
  );
}

export default Browse;
