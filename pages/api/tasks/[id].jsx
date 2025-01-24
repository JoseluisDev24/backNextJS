import Task from "../../../models/Task";
import dbConnect from "../../../utils/dbConnect";



export default async function handler(req, res) {
  const { id } = req.query; // Obtiene el ID de la tarea desde los parámetros de la URL.

  await dbConnect() // Conecta a la base de datos.

  if (req.method === "GET") {
    try {
      const task = await Task.findById(id); // Busca la tarea por _id.
      if (!task) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la tarea" });
    }
  } else if (req.method === "PATCH") {
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true, // Devuelve el documento actualizado.
      });
      if (!updatedTask) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar la tarea" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedTask = await Task.findByIdAndDelete(id); // Elimina la tarea por _id.
      if (!deletedTask) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.status(200).json({ message: "Tarea eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la tarea" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}