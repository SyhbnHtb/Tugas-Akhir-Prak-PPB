import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

import PopupGuestWarning from "../components/popup/PopupGuestWarning";
import GenreTag from "../components/anime/GenreTag";

import { ArrowLeft, Star, Tv, Building2, Heart, Check } from "lucide-react";
import "./AnimeDetailPage.css";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [added, setAdded] = useState(false); // apakah sudah di-watchlist

  // Fetch anime detail dari Supabase
  useEffect(() => {
    async function fetchAnimeDetail() {
      const { data, error } = await supabase
        .from("animes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching detail:", error);

      if (data) {
        data.genre = Array.isArray(data.genre) ? data.genre : [];
      }

      setAnime(data);
      setLoading(false);
    }

    fetchAnimeDetail();
  }, [id]);

  // Cek apakah anime ini sudah ada di watchlist
  useEffect(() => {
    async function checkWatchlist() {
      if (!user) return;

      const { data } = await supabase
        .from("watchlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", id)
        .single();

      if (data) setAdded(true);
    }

    checkWatchlist();
  }, [user, id]);

  // Jika loading
  if (loading) {
    return (
      <div className="detail-container">
        <p className="loading-text">Loading anime...</p>
      </div>
    );
  }

  // Jika anime tidak ditemukan
  if (!anime) {
    return (
      <div className="detail-container">
        <p style={{ padding: "20px", color: "#fff" }}>Anime tidak ditemukan.</p>
      </div>
    );
  }

  // ADD TO WATCHLIST
  async function handleAddToWatchlist() {
    if (!user) {
      setShowPopup(true);
      return;
    }

    // Cegah duplikasi
    if (added) {
      alert("Anime ini sudah ada di Watchlist kamu!");
      return;
    }

    const { error } = await supabase.from("watchlist").insert([
      {
        user_id: user.id,
        anime_id: anime.id,
      },
    ]);

    if (error) {
      console.error("Error adding watchlist:", error);
      alert("Gagal menambahkan ke watchlist!");
    } else {
      setAdded(true);
      alert("Berhasil ditambahkan ke Watchlist!");
    }
  }

  return (
    <div className="detail-container">
      {/* Popup Login */}
      {showPopup && <PopupGuestWarning onClose={() => setShowPopup(false)} />}

      {/* Header Image */}
      <div className="detail-header-wrapper">
        <img
          src={anime.image}
          alt={anime.title}
          className="detail-header-image"
        />

        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} color="#BFA181" />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h1 className="detail-title">{anime.title}</h1>

        {/* Genre */}
        <div>
          {anime.genre.map((g, idx) => (
            <GenreTag key={idx} label={g} />
          ))}
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-box">
            <Star color="#BFA181" size={20} />
            <span className="stat-text">{anime.rating}</span>
          </div>

          <div className="stat-box">
            <Tv color="#BFA181" size={20} />
            <span className="stat-text">{anime.episodes} episodes</span>
          </div>

          <div className="stat-box">
            <Building2 color="#BFA181" size={20} />
            <span className="stat-text">{anime.studio}</span>
          </div>
        </div>

        {/* Description */}
        <p className="detail-description">{anime.description}</p>

        {/* Add to Watchlist */}
        <button className="watchlist-button" onClick={handleAddToWatchlist}>
          {added ? (
            <>
              <Check size={22} /> Added
            </>
          ) : (
            <>
              <Heart size={22} /> Add to Watchlist
            </>
          )}
        </button>
      </div>
    </div>
  );
}
