import React from "react";
import { User, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* ABOUT SECTION */}
      <div className="card">
        <h2 className="card-title">
          <Info size={22} color="#BFA181" />
          About MyAnimeAkuh
        </h2>

        <p>
          MyAnimeAkuh adalah aplikasi katalog anime lengkap yang menampilkan
          daftar anime, detail anime, genre, serta watchlist pengguna.
          Aplikasi ini juga merupakan tugas akhir dari praktikum PPB Syahbana Hatab.
        </p>

        <p style={{ marginTop: "10px" }}>
          Dashboard ini dapat dibuka dan dimuat sepenuhnya meskipun offline.
        </p>
      </div>

      {/* VIEW FULL SITE BUTTON */}
      <button
        className="btn-primary"
        onClick={() => navigate("/home")}
        style={{ marginTop: "10px" }}
      >
        View Full Site
      </button>
    </div>
  );
}
