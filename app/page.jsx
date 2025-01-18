"use client";
import Title from "../components/Title/Title";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import TodoItem from "../components/TodoItem/TodoItem";
import { Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import Footer from "../components/Footer/Footer";


const TodoApp = () => {
  const { tasks, setTasks } = useTaskContext();

  return (
    <div className="relative bg-gray-900 min-h-screen h-full text-gray-100 flex items-center justify-center py-20 px-5 font-inter">
      <Link
        to={`login`}
        className="absolute top-3 right-3 w-20 bg-slate-700 rounded-lg p-2 text-white text-center cursor-pointer hover:bg-slate-600"
      >
        Login
      </Link>
      <div className="container flex flex-col max-w-xl">
        <Title />
        <TodoForm />
        <TodoList>
          {tasks.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </TodoList>
        <Footer />
      </div>
    </div>
  );
};

export default TodoApp;
