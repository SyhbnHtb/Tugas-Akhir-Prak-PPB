import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function login(email, password) {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return { success: false };
    }

    return { success: true };
  }

  return {
    login,
    loading,
    errorMsg,
  };
}
