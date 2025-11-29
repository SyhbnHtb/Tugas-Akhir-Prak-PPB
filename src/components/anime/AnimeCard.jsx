import React from "react";
import GenreTag from "./GenreTag";
import useAnimeImage from "../../hooks/useAnimeImage";
import "./AnimeCard.css";

export default function AnimeCard({ anime, onClick }) {
  const imgSrc = useAnimeImage(anime);

  return (
    <div className="anime-card" onClick={onClick}>
      <div className="anime-image-wrapper">
        <img src={imgSrc} alt={anime.title} />
      </div>

      <div className="anime-info">
        <h3 className="anime-title">{anime.title}</h3>

        <div className="genre-tag-container">
          {anime.genre.map((g) => (
            <GenreTag key={g} label={g} />
          ))}
        </div>
      </div>
    </div>
  );
}
