"use client"
import React from "react";
import { useRef } from "react";
import { useTaskContext } from "../../context/TaskContext";

function TodoForm() {
  const { tasks, setTasks } = useTaskContext();

  const nameRef = useRef();

  const handleAddTask = (event) => {
    event.preventDefault();

    const taskValue = nameRef.current.value.trim();
    if (!taskValue) return;

    const data = {
      title: taskValue,
      description: "",
      isCompleted: false,
    };

    async function postData(data) {
      try {
        const response = await fetch(
          "https://back-next-js.vercel.app/api/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const createTask = await response.json();
          setTasks((tasks) => [...tasks, createTask]);
          console.log("Success:", createTask);
          nameRef.current.value = "";
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    postData(data);
  };

  return (
    <div className="mt-6 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="border border-gray-300 border-solid p-3 rounded-full"></span>
      </div>
      <form action="" onSubmit={handleAddTask}>
        <input
          type="text"
          className="shadow-lg font-inter focus:shadow-blue-800 pl-12 w-full py-4 bg-gray-700 rounded-xl outline-none transition-all duration-300 ease-in-out"
          placeholder="Wat's next..."
          ref={nameRef}
        />
      </form>
    </div>
  );
}

export default TodoForm;
