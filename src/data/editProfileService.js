// src/services/profileService.js
import { supabase } from "../supabaseClient";

// --- GET PROFILE ---
export async function getUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

// --- UPDATE PROFILE (username + avatar) ---
export async function updateUserProfile(userId, username, avatarUrl) {
  return await supabase.from("profiles").upsert({
    id: userId,
    username,
    avatar_url: avatarUrl,
    updated_at: new Date(),
  });
}

// --- UPDATE PASSWORD ---
export async function updateUserPassword(newPassword) {
  return await supabase.auth.updateUser({
    password: newPassword,
  });
}
