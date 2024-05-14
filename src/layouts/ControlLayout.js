import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import bg from "../assets/bg.jpeg";
export default function ControlLayout() {
  const [password, setPassword] = useState("");
  const [getThrough, setGetThrough] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="bg-black w-full min-h-screen relative flex flex-col items-center  font-black leading-none overflow-hidden">
      <img className="absolute z-0 top-0 left-0 w-full h-full object-cover" src={bg} alt="Back" />
      <div className="w-[95%] relative z-10 py-10 flex flex-col h-1/2 flex-grow">
        {/* <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-2.5 items-start">
            <p className="text-3xl font-bold">REEDE LAUPAEV, 31. MAI 1. JUUNI</p>
            <h1 className="text-[100px] tracking-[-1%]">KAWE PADEL OPEN 2024</h1>
          </div>
          <img className="" src={logo} />
        </div> */}
        {getThrough ? (
          <Outlet></Outlet>
        ) : (
          <div className="flex flex-col items-center justify-center my-auto mx-auto gap-4">
            <h1 className="text-5xl">Enter password to get through</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password === process.env.REACT_APP_PASSWORD) {
                  setGetThrough(true);
                } else {
                  setError("Wrong password");
                }
              }}
              className="flex flex-col gap-4 w-full max-w-lg relative">
              <input
                className="bg-gray-700 py-4 px-10 rounded-2xl w-full  caret-primary text-white text-5xl  outline-none"
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              <button className="uppercase text-5xl py-4 px-10 text-center w-full bg-primary text-black rounded-2xl">
                Submit
              </button>

              <p className="text-3xl text-red-600 uppercase font-medium absolute top-full translate-y-4 left-1/2 -translate-x-1/2 max-w-lg text-center">
                {error}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
