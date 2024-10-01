import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query; // Captura o ID da URL

  if (req.method === 'GET') {
    try {
      const filme = await prisma.filmes.findUnique({
        where: {
          id: parseInt(id), // Certifique-se de converter para número
        },
        include: {
          genero: true,
        },
      });

      if (filme) {
        res.status(200).json(filme);
      } else {
        res.status(404).json({ error: "Filme não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar filme" });
    }
  } else if (req.method === 'PUT') {
    const { titulo, ano, lancamento, diretor, generoId } = req.body;

    try {
      const filmeAtualizado = await prisma.filmes.update({
        where: {
          id: parseInt(id),
        },
        data: {
          titulo,
          ano,
          lancamento,
          diretor,
          generoId: parseInt(generoId),
        },
      });

      res.status(200).json(filmeAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar filme" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.filmes.delete({
        where: {
          id: parseInt(id), // Certifique-se de converter para número
        },
      });

      res.status(200).json({ message: "Filme deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      res.status(500).json({ error: "Erro ao deletar filme" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
