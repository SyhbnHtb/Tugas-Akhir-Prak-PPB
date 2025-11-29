import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function useUserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    // Ambil user login saat ini
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(data.user);

    // Ambil data profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (!profileError) {
      setProfile(profileData);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return {
    user,
    profile,
    loading,
    logout,
  };
}
