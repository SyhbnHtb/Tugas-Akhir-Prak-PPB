import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimeCard from "../components/anime/animecard";
import useAnimeByGenre from "../hooks/useAnimeByGenre";

import genreList from "../data/genreList";   // ⬅️ IMPORT GENRE LIST
import "./GenrePage.css";

export default function GenrePage() {
  const navigate = useNavigate();
  const { animeList, loading } = useAnimeByGenre();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");

  // Filtering
  const filteredAnime = animeList.filter((anime) => {
    const normalizedGenres = anime.genre.map((g) => g.trim().toLowerCase());

    const matchGenre =
      selectedGenre === "" ||
      normalizedGenres.includes(selectedGenre.toLowerCase());

    const matchSearch = anime.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchGenre && matchSearch;
  });

  return (
    <div className="genre-page-container px-4 md:px-8 relative overflow-hidden">

      {/* BG lights */}
      <div className="genre-bg-light-1"></div>
      <div className="genre-bg-light-2"></div>

      <h1 className="text-center text-4xl font-extrabold text-[#BFA181] drop-shadow-lg mt-6 mb-6 animate-fadeUp">
        Browse by Genre
      </h1>

      {/* ========================= TOP SECTION ========================= */}
      <div className="genre-top-section animate-fadeUp">

        {/* Genre Chips */}
        <div className="genre-chips-wrapper">
          <button
            onClick={() => setSelectedGenre("")}
            className={`genre-chip ${selectedGenre === "" ? "active" : ""}`}
          >
            All
          </button>

          {genreList.map((genre) => (     // ⬅️ GANTI allGenres → genreList
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`genre-chip ${selectedGenre === genre ? "active" : ""}`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search anime in this genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="genre-search"
        />
      </div>

      {/* Subtitle */}
      <p className="genre-label mt-2 text-white/90 text-lg text-center animate-fadeUp">
        Showing:{" "}
        <span>{selectedGenre === "" ? "All Genres" : selectedGenre}</span>
      </p>

      {loading && <p className="not-found mt-12 animate-fadeUp">Loading...</p>}

      {/* Anime Grid */}
      <div className="anime-grid mt-8 animate-fadeUp">
        {!loading &&
          filteredAnime.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={() => navigate(`/anime/${anime.id}`)}
            />
          ))}
      </div>

      {!loading && filteredAnime.length === 0 && (
        <p className="not-found mt-12 animate-fadeUp">
          Anime tidak ditemukan...
        </p>
      )}
    </div>
  );
}
