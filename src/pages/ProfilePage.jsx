import React from "react";
import { useNavigate } from "react-router-dom";
import PopupGuestWarning from "../components/popup/PopupGuestWarning";
import useUserProfile from "../hooks/useUserProfile";

import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading, logout } = useUserProfile();

  // Jika belum login
  if (!loading && !user) {
    return <PopupGuestWarning onClose={() => navigate("/login")} />;
  }

  if (loading) {
    return (
      <div className="profile-container">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* LEFT — AVATAR */}
        <div className="profile-left">
          <img
            src={
              profile?.avatar_url ||
              "https://via.placeholder.com/150?text=No+Avatar"
            }
            alt="Avatar"
            className="profile-avatar"
          />
        </div>

        {/* RIGHT — USER INFO */}
        <div className="profile-right">
          <h1 className="profile-title">My Profile</h1>

          <div className="profile-info">
            <p>
              <strong>Name:</strong> {profile?.username || "No Name"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          {/* Extra Info */}
          <div className="profile-extra">
            <div className="extra-box">
              <h3>Account Status</h3>
              <p>Active Member</p>
            </div>

            <div className="extra-box">
              <h3>Member Since</h3>
              <p>{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="profile-actions">
            <button
              className="btn-edit"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>

            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
