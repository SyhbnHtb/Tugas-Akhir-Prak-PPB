import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import "./EditProfilePage.css";

// Backend dipisah
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../data/editProfileService";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { user, profile } = await getUserProfile();

    if (!user) return navigate("/login");

    setUsername(profile?.username || "");
    setAvatarUrl(profile?.avatar_url || "");
  }

  function handleAvatarFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setLoading(true);

    const { user } = await getUserProfile();

    // 1️⃣ Update username & avatar
    await updateUserProfile(user.id, username, avatarUrl);

    // 2️⃣ Update password jika diisi
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi tidak sama!");
        setLoading(false);
        return;
      }

      const { error } = await updateUserPassword(password);
      if (error) {
        alert("Gagal update password");
        setLoading(false);
        return;
      }
    }

    alert("Profile updated!");
    setLoading(false);
    navigate("/profile");
  }

  return (
    <div className="editprofile-container">
      <h1 className="page-title">Profile Settings</h1>

      <div className="edit-card">
        {/* LEFT */}
        <div className="left-section">
          <div
            className="profile-pic-wrapper"
            style={{
              backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
            }}
            onClick={() =>
              document.getElementById("avatar-upload-input").click()
            }
          ></div>

          <input
            id="avatar-upload-input"
            type="file"
            accept="image/*"
            onChange={handleAvatarFile}
          />

          <p className="profile-hint">
            Click image to upload new photo
          </p>
        </div>

        {/* RIGHT */}
        <div className="right-section">
          <h1 className="edit-title">Edit Profile</h1>

          <div className="input-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Avatar URL (optional)</label>
            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>New Password (optional)</label>
            <input
              type="password"
              placeholder="Leave empty if not changing"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="bottom-buttons">
            <button className="cancel-btn" onClick={() => navigate("/profile")}>
              Cancel
            </button>

            <button
              className="save-btn"
              disabled={loading}
              onClick={handleSave}
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
