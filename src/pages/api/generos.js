import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
  if (req.method === 'GET') {
    return handlerGetgeneros(req, res);
  }
  if (req.method === 'POST') {
    return handlerPostgeneros(req, res);
  }
  res.status(405).send({});
}

async function handlerGetgeneros(req, res) { //requisicao get para buscar dados - listar
  const prisma = new PrismaClient();
  try {
    console.log('PASSEI AQUI');
    const generos = await prisma.Genero.findMany(); // NOME DA TABELA NO BANCO DE DADOS - GENERO'
    res.status(200).json(generos); // Usar status 200 para 'OK'
  } catch (error) {
    console.error('Erro ao buscar generos:', error);
    res.status(500).json({ error: 'Erro ao buscar generos' });
  }
}

async function handlerPostgeneros(req, res) { //requisicao post para enviar dados - salvar - criar
  const prisma = new PrismaClient();
  const { name } = req.body;
  try {
    const genero = await prisma.Genero.create({
      data: {
        name,
      },
    });
    res.status(201).json(genero); // Usar status 201 para 'Created'
  } catch (error) {
    console.error('Erro ao criar genero:', error);
    res.status(500).json({ error: 'Erro ao criar genero' });
  }
}
