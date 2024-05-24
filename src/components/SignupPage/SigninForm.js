import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Input from "../UI/Input";

export default function SigninForm({ signUp = false, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="w-full max-w-xs flex flex-col gap-2 font-normal">
      <Input
        required
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Your e-mail"
      />
      <div className="w-full relative">
        <Input
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Your password"
        />
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="w-4 h-4 absolute right-4  top-1/2 -translate-y-1/2 z-10 cursor-pointer">
          {!showPassword ? (
            <EyeIcon className="w-full h-full" />
          ) : (
            <EyeSlashIcon className="w-full h-full" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-5 py-2 disabled:bg-gray-300 text-xl rounded-lg bg-green-400 hover:bg-green-500 outline-transparent outline focus-within:outline-primary outline-1">
        {signUp ? "Signup" : "Login"}
      </button>
    </form>
  );
}
