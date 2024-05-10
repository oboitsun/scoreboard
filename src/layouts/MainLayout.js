import React from "react";
import { Outlet } from "react-router-dom";
import bg from "../assets/bg.jpeg";
import logo from "../assets/logo.svg";
export default function MainLayout() {
  return (
    <div className="bg-black w-full min-h-screen relative flex flex-col items-center  font-black leading-none overflow-hidden">
      <img className="absolute z-0 top-0 left-0 w-full h-full object-cover" src={bg} alt="Back" />
      <div className="w-[95%] relative z-10 py-16 flex flex-col h-1/2 flex-grow">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-2.5 items-start">
            <p className="text-3xl font-bold">REEDE LAUPAEV, 31. MAI 1. JUUNI</p>
            <h1 className="text-[100px] tracking-[-1%]">KAWE PADEL OPEN 2024</h1>
          </div>
          <img className="" src={logo} />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}