import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Layers, Heart, User, Info, LogIn, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./DesktopNavbar.css";

export default function DesktopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="desktop-navbar">

      {/* LOGO + TITLE */}
      <div className="nav-brand">
        <img src="/LogoMyAnimeAkuh.svg" alt="logo" className="nav-logo" />
        <h1 className="nav-title">MyAnimeAkuh</h1>
      </div>

      <nav className="nav-menu">

        <NavLink to="/dashboard" className="nav-link">
          <Info size={18} /> Dashboard
        </NavLink>

        <NavLink to="/home" className="nav-link">
          <Home size={18} /> Home
        </NavLink>

        <NavLink to="/genre" className="nav-link">
          <Layers size={18} /> Genre
        </NavLink>

        <NavLink
          to="/watchlist"
          className="nav-link"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              alert("Silahkan login untuk membuka Watchlist");
              navigate("/login");
            }
          }}
        >
          <Heart size={18} /> Watchlist
        </NavLink>

        {!user && (
          <button className="nav-link" onClick={() => navigate("/login")}>
            <LogIn size={18} /> Sign In
          </button>
        )}

        {user && (
          <>
            <NavLink to="/profile" className="nav-link">
              <User size={18} /> Profile
            </NavLink>

            <button className="nav-link" onClick={logout}>
              <LogOut size={18} /> Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
