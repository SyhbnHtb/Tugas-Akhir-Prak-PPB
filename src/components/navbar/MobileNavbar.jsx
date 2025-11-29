import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Layers, Heart, User, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./MobileNavbar.css";

export default function MobileNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mobile-navbar">
      <div className="mobile-nav-content">

        <NavLink to="/home" className="nav-item">
          <Home size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/genre" className="nav-item">
          <Layers size={22} />
          <span>Genre</span>
        </NavLink>

        {/* Watchlist */}
        <NavLink
          to="/watchlist"
          className="nav-item"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              alert("Silahkan login untuk membuka Watchlist");
              navigate("/login");
            }
          }}
        >
          <Heart size={22} />
          <span>Watchlist</span>
        </NavLink>

        {/* Guest: Sign in button */}
        {!user && (
          <button
            className="nav-item"
            onClick={() => navigate("/login")}
          >
            <LogIn size={22} />
            <span>Sign In</span>
          </button>
        )}

        {/* Logged-in: Profile */}
        {user && (
          <NavLink to="/profile" className="nav-item">
            <User size={22} />
            <span>Profile</span>
          </NavLink>
        )}

      </div>
    </div>
  );
}
