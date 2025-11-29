import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-container">

      {/* Icon + welcome */}
      <div className="hero-header">
        <Sparkles size={26} className="text-gold" style={{ color: "#BFA181" }} />
        <span className="hero-welcome">Welcome to MyAnimeAkuh</span>
      </div>

      {/* LOGO */}
      <div className="brand">
        <img src="/LogoMyAnimeAkuh.svg" alt="logo" className="logo" />
      </div>

      {/* Title */}
      <h1 className="hero-title">
        Explore Your Favorite Anime<br />
        Anytime, Anywhere.
      </h1>

      {/* Description */}
      <p className="hero-desc">
        Temukan anime berdasarkan genre, lihat detail, dan simpan ke watchlist kamu.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/genre")}
        className="hero-button"
      >
        Explore Now
      </button>

    </div>
  );
}
