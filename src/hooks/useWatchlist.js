import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useWatchlist(user) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchWatchlist() {
      // 1. Ambil daftar anime_id user
      const { data: list, error } = await supabase
        .from("watchlist")
        .select("anime_id")
        .eq("user_id", user.id);

      if (error) {
        setErrorMsg("Failed to load watchlist.");
        setLoading(false);
        return;
      }

      if (!list || list.length === 0) {
        setWatchlist([]);
        setLoading(false);
        return;
      }

      // 2. Ambil anime berdasarkan ID
      const animeIds = list.map((w) => w.anime_id);

      const { data: animeData, error: animeError } = await supabase
        .from("animes")
        .select("*")
        .in("id", animeIds);

      if (animeError) {
        setErrorMsg("Failed to load anime data.");
        setLoading(false);
        return;
      }

      // Normalisasi genre
      const normalized = animeData.map((item) => ({
        ...item,
        genre: Array.isArray(item.genre) ? item.genre : [],
      }));

      setWatchlist(normalized);
      setLoading(false);
    }

    fetchWatchlist();
  }, [user]);

  return { watchlist, loading, errorMsg };
}
