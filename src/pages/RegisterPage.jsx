import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Loader2 } from "lucide-react";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) setErrorMsg(error.message);
    else {
      setSuccessMsg("Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 1500);
    }
  }

  return (
    <div className="register-page">
      
      {/* Background */}
      <div className="register-bg-gradient"></div>
      <div className="register-orb register-orb-teal"></div>
      <div className="register-orb register-orb-gold"></div>

      {/* CARD */}
      <div className="register-card">
        <h1>Register</h1>

        <form onSubmit={handleRegister}>

          <label>Email</label>
          <input
            type="email"
            required
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && <p className="register-error">{errorMsg}</p>}
          {successMsg && <p className="register-success">{successMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading && <Loader2 className="reg-spin" size={20} />}
            Register
          </button>

          <p className="register-login-text">
            Sudah punya akun?{" "}
            <span onClick={() => navigate("/login")}>Login di sini</span>
          </p>
        </form>
      </div>
    </div>
  );
}
