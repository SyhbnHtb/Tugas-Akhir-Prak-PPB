import React from "react";

export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full blur-2xl bg-blue-300/30 animate-pulse"></div>
      </div>
    </div>
  );
}
