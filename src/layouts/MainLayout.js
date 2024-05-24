import React from "react";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="bg-black w-full min-h-screen relative flex flex-col items-center  font-black leading-none overflow-hidden">
      <div className="w-[95%] relative z-10 py-16 flex flex-col h-1/2 flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
