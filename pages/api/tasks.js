import dbConnect from '../../utils/dbConnect';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await dbConnect(); // Conecta a MongoDB

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find(); // Obtén todos los productos
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  } else {
    // Manejar métodos no permitidos
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}