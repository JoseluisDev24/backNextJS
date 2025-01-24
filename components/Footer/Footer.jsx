"use client";

import React from "react";
import { useTaskContext } from "../../context/TaskContext";
function Footer() {
  const { tasks, setTasks } = useTaskContext();
  const handleDeleteCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);

    try {
      await Promise.all(
        completedTasks.map(async (task) => {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${task._id}`;
          const response = await fetch(url, { method: "DELETE" });

          if (!response.ok) {
            throw new Error(`Error al eliminar la tarea con ID: ${task._id}`);
          }
        })
      );

      setTasks((tasks) => tasks.filter((task) => !task.isCompleted));
      console.log("Tareas completadas eliminadas correctamente");
    } catch (error) {
      console.error("Error al eliminar tareas completadas:", error.message);
    }
  };

  return (
    <div className="bg-gray-700 p-4 flex items-center justify-between  rounded-lg mt-2">
      <span className="cursor-pointer">Clear Completed</span>
      <img
        className="cursor-pointer w-6"
        src="trash.svg"
        alt="trash icon"
        onClick={handleDeleteCompleted}
      />
    </div>
  );
}

export default Footer;
