import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimeCard from "../components/anime/AnimeCard";
import PopupGuestWarning from "../components/popup/PopupGuestWarning";
import { useAuth } from "../context/AuthContext";

import { useWatchlist } from "../hooks/useWatchlist";

import "./WatchlistPage.css";

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);

  const { watchlist, loading } = useWatchlist(user);

  // Jika user guest
  if (!user) {
    return <PopupGuestWarning onClose={() => navigate("/login")} />;
  }

  return (
    <div className="watchlist-container">

      <h1 className="watchlist-title">My Watchlist</h1>

      {loading && <p className="loading-text">Loading Watchlist...</p>}

      {!loading && watchlist.length === 0 && (
        <div className="empty-state">
          <p>Watchlist kamu masih kosong.</p>
          <p>Tambahkan anime dari halaman detail anime.</p>
        </div>
      )}

      {!loading && watchlist.length > 0 && (
        <div className="watchlist-grid">
          {watchlist.map((anime) => (
            <div
              key={anime.id}
              onClick={() => navigate(`/anime/${anime.id}`)}
              className="anime-card"
            >
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
