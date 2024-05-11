import React from "react";

export default function FrameLayout() {
  return (
    <div className="w-full h-screen">
      <iframe
        className="w-full h-full "
        src="https://scoreboard-cyan-two.vercel.app/current-match"
      />
    </div>
  );
}
