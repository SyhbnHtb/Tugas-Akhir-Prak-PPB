import React from "react";

export default function FloatingElement({ size = 80, color = "bg-purple-300/40", top = "30%", left = "10%" }) {
  return (
    <div
      className={`absolute rounded-full blur-2xl animate-floating ${color}`}
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
      }}
    />
  );
}
