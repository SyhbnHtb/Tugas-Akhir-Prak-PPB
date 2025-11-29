import React from "react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white" />

      {/* Pattern grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blur blobs */}
      <div className="absolute top-10 left-10 w-56 h-56 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>
    </div>
  );
}
