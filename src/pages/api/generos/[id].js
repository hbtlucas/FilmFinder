import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query; // Captura o ID da URL

  if (req.method === 'GET') {
    try {
      console.log('estou aqui agora - get')
      const genero = await prisma.genero.findUnique({
        where: {
          id: parseInt(id), // Certifique-se de converter para número
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
      console.log('estou aqui - put')
      const generoAtualizado = await prisma.genero.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
        },
      });

      res.status(200).json(generoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar genero" });
    }

  } else if (req.method === 'DELETE') {
    try {
      console.log('estou aqui - deletando')
      await prisma.genero.delete({
        where: {
          id: parseInt(id), // Certifique-se de converter para número
        },
      });

      res.status(200).json({ message: "deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar:", error);
      res.status(500).json({ error: "Erro ao deletar" });
    }

  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
