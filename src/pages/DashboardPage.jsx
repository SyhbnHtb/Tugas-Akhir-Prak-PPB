import React from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { User, Info } from "lucide-react";

import "./DashboardPage.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* USER INFORMATION */}
      <div className="card">
        <h2 className="card-title">
          <User size={22} color="#BFA181" />
          User Information
        </h2>

        {user ? (
          <div>
            <p>{user.email}</p>
            <p className="text-secondary">User ID: {user.id}</p>
          </div>
        ) : (
          <div>
            <p>Guest Mode</p>
            <p className="text-secondary">Login untuk menikmati fitur penuh</p>
          </div>
        )}
      </div>

      {/* ABOUT SECTION */}
      <div className="card">
        <h2 className="card-title">
          <Info size={22} color="#BFA181" />
          About MyAnimeAkuh
        </h2>

        <p>
          MyAnimeAkuh adalah aplikasi katalog anime lengkap yang menampilkan
          daftar anime, detail anime, genre, serta watchlist pengguna. Aplikasi ini juga merupakan tugas akhir dari praktikum PPB Syahbana Hatab.
        </p>

        <p style={{ marginTop: "10px" }}>
          Dashboard ini menampilkan informasi akun atau guest mode.
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
