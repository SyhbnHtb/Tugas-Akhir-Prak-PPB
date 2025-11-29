import React from "react";
import "./Popup.css";

export default function PopupGuestWarning({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>Silahkan login</h2>
        <p>Untuk menambahkan anime ke Watchlist, silahkan login terlebih dahulu.</p>

        <button className="popup-btn" onClick={() => (window.location.href = "/login")}>
          Sign In
        </button>

        <button className="popup-close" onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
}
