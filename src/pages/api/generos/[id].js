import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query; // Captura o ID da URL

  if (req.method === 'GET') {
    try {
      const genero = await prisma.Genero.findUnique({
        where: {
          id: parseInt(id), // Certifique-se de converter para número
        },
        include: {
          id: true, //
          genero: true,
        },
      });

      if (genero) {
        res.status(200).json(genero);
      } else {
        res.status(404).json({ error: "genero não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar genero" });
    }
  } else if (req.method === 'PUT') {
    const { id,name } = req.body;

    try {
      const generoAtualizado = await prisma.Genero.update({
        where: {
          id: parseInt(id),
        },
        data: {
          id,
          name,
        },
      });

      res.status(200).json(generoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar genero" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
