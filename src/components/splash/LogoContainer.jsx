import React from "react";

export default function LogoContainer({ size = 90 }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-2xl shadow-lg bg-white/70 backdrop-blur-md flex items-center justify-center border border-white/40"
        style={{ width: size, height: size }}
      >
        <img
          src="/LogoMyAnimeAkuh.svg"
          alt="Logo"
          className="rounded-xl w-3/4 h-3/4 object-contain"
        />
      </div>

      <h1 className="mt-3 text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        MyAnimeAkuh
      </h1>
    </div>
  );
}
