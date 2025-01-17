import Cors from "cors";
import dbConnect from "../../utils/dbConnect";
import Task from "../../models/Task";

// Configuración de CORS
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:5173", // Cambia según tu dominio
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
  await dbConnect(); // Conecta a MongoDB

  if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
