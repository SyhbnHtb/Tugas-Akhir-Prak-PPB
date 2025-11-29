import AnimeCard from "../anime/animecard";
import "./AnimeListSection.css";

export default function AnimeListSection({ anime }) {
  return (
    <div className="anime-list-container">
      {anime.map((item) => (
        <AnimeCard key={item.id} anime={item} />
      ))}
    </div>
  );
}
