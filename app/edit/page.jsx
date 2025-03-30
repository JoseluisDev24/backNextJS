"use client"
import React from "react";
import Link from "next/link";

import { useTaskContext } from "../../context/TaskContext";

function editTask() {
  const { tasks, setTasks } = useTaskContext();
  return (
    <div className="bg-gray-900 min-h-screen h-full text-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-96 text-lg gap-3">
        <h1 className="text-4xl font-anton font-bold tracking-widest">
          Edit Task
        </h1>
        <form className="flex flex-col shadow-xl shadow-blue-800 border-2 border-solid border-gray-600 p-4 rounded-lg w-80 font-medium gap-2">
          <label htmlFor="taskName">Task name</label>
          <input
            id="taskName"
            type="text"
            className="rounded-md h-9 text-sm border-solid border border-black cursor-text text-black px-2"
          />
          <label htmlFor="taskStatus">Status</label>
          <select
            id="taskStatus"
            className="mb-4 rounded-md text-sm h-9 border-solid border border-black text-black px-2"
          >
            <option value="completed" className="text-sm">
              Completed
            </option>
            <option value="incomplete" className="text-sm">
              Incomplete
            </option>
          </select>
          <button
            type="submit"
            className="bg-slate-700 rounded-lg p-2 text-white text-center cursor-pointer hover:bg-slate-600"
          >
            Save
          </button>
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

export default editTask;
