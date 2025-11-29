import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Selalu redirect ke Dashboard (guest atau login)
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center splash-container text-white">

      <div className="animate-fadeIn">
        <img
          src="/LogoMyAnimeAkuh.svg"
          alt="App Logo"
          className="w-32 h-32 splash-logo mb-6"
        />
      </div>

      <h1 className="text-3xl font-extrabold tracking-wide animate-fadeIn fade-delay-1">
        MyAnimeAkuh
      </h1>

      <p className="mt-2 text-sm opacity-80 animate-fadeIn fade-delay-2">
        Loading your anime world...
      </p>
    </div>
  );
}
