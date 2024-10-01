import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
  if (req.method === 'GET') {
    return handlerGetFilmes(req, res);
  }
  if (req.method === 'POST') {
    return handlerPostFilmes(req, res);
  }
  res.status(405).send({});
}

async function handlerGetFilmes(req, res) { //metodo GET (buscar dados)
  const prisma = new PrismaClient();
  try {
    const filmes = await prisma.filmes.findMany({
      include: {
        genero: true, //incluindo os dados da tabela genero para ser exibido na listagem home
      },
    }); 
    res.status(200).json(filmes); // Usar status 200 para 'OK'
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}

async function handlerPostFilmes(req, res) { //metodo POST (enviar dados)
  const prisma = new PrismaClient();
  const { titulo, ano, lancamento, diretor, generoId } = req.body;
  try {
    const filme = await prisma.filmes.create({
      data: {
        titulo,
        ano,
        lancamento,
        diretor,
        generoId: parseInt(generoId) //sempre utilizar parseINT para garantir que será um INTEIRO e nao uma STRING 
        //para evitar erro Expected Int, provided String.
      },
    });
    res.status(201).json(filme); // Usar status 201 para 'Created'
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ error: 'Erro ao criar filme' });
  }
}

