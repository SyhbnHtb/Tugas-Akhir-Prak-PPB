export default function useAnimeImage(anime) {
  return anime?.image && anime.image.trim() !== ""
    ? anime.image
    : "https://supabase.com/dashboard/project/nwfetixceldlwwbaptfa/storage/files/buckets/Gambar%20Anime";
}
