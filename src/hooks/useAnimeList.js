import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function useAnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      const { data, error } = await supabase
        .from("animes")
        .select("*")
        .order("title", { ascending: true });

      if (error) {
        console.error("Error loading anime:", error);
        setError(error);
      } else {
        const normalized = data.map((item) => ({
          ...item,
          genre: Array.isArray(item.genre)
            ? item.genre
            : typeof item.genre === "string"
            ? JSON.parse(item.genre)
            : [],
          image: item.image ?? "",
        }));

        setAnimeList(normalized);
      }

      setLoading(false);
    }

    fetchAnime();
  }, []);

  return { animeList, loading, error };
}
