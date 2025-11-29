import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundPattern from "../components/splash/BackgroundPattern";
import FloatingElement from "../components/splash/FloatingElement";
import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import AnimeCard from "../components/anime/AnimeCard";
import Footer from "../components/splash/Footer";

import useAnimeList from "../hooks/useAnimeList";

import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const { animeList, loading } = useAnimeList();
  const [search, setSearch] = useState("");

  const filteredAnime = animeList.filter((anime) =>
    anime.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <BackgroundPattern />

      <FloatingElement size={90} top="20%" left="5%" />
      <FloatingElement size={120} top="60%" left="80%" />
      <FloatingElement size={70} top="40%" left="50%" />

      <div className="hero-wrapper">
        <HeroSection />
      </div>

      <div className="searchbar-wrapper">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <h2 className="section-title">Anime List</h2>

      {loading && <p className="loading-text">Loading anime...</p>}

      <div className="anime-grid">
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
        <p className="not-found">Anime tidak ditemukan...</p>
      )}

      <Footer />
    </div>
  );
}
