import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";
import useLogin from "../hooks/useLogin";

import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login, loading, errorMsg } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-page">

      {/* Background elements */}
      <div className="bg-gradient"></div>
      <div className="orb orb-purple"></div>
      <div className="orb orb-blue"></div>

      {/* Card */}
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Silahkan login untuk melanjutkan petualangan anime kamu 🎌</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
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

          {errorMsg && <p className="error">{errorMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading && <Loader2 className="spin" size={20} />}
            Login
          </button>
        </form>

        <p className="register-text">
          Belum punya akun?{" "}
          <span onClick={() => navigate("/register")}>Daftar sekarang</span>
        </p>
      </div>
    </div>
  );
}
