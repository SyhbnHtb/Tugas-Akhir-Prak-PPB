import React from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-container">
      <Search className="searchbar-icon" size={22} />

      <input
        type="text"
        placeholder="Search anime..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="searchbar-input"
      />
    </div>
  );
}
