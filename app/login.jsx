import React from "react";
import Link from "next/link";


function login() {
  return (
    <div className="bg-gray-900 min-h-screen h-full text-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-96 text-lg gap-3">
        <h1 className="text-4xl font-anton font-bold tracking-widest">Login</h1>
        <form className="flex flex-col shadow-xl shadow-blue-800 border-2 border-solid border-gray-600 p-4 rounded-lg w-80 font-medium gap-2">
          <label htmlFor="taskName">Username</label>
          <input
            id="Username"
            type="text"
            className="rounded-md h-9 text-sm border-solid border border-black cursor-text text-black px-2"
          />
          <label htmlFor="taskStatus">Password</label>
          <input
            type="text"
            id="Password"
            className="rounded-md h-9 text-sm border-solid border border-black cursor-text text-black px-2"
          />
          <Link
            href="/"
            type="submit"
            className="bg-slate-700 rounded-lg p-2 text-white text-center cursor-pointer hover:bg-slate-600"
          >
            Login
          </Link>
          <Link
            href="/"
            className="border border-solid border-slate-600 rounded-lg p-2 cursor-pointer hover:bg-slate-600 text-center"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default login;
