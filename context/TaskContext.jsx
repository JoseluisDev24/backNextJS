"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

// Proveedor del contexto
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks"); // URL relativa en Next.js
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom Hook
export function useTaskContext() {
  return useContext(TaskContext);
}
