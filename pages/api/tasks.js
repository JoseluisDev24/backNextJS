import Cors from "cors";
import dbConnect from "../../utils/dbConnect";
import Task from "../../models/Task";

// Configuración de CORS
const cors = Cors({
  methods: ["GET", "POST"], // Permite GET y POST
  origin: "*",
});

// Helper para ejecutar middlewares
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Aplica CORS
  await dbConnect(); 

  if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  } else if (req.method === "POST") {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: "Error al crear la tarea" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
