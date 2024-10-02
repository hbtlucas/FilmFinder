import { PrismaClient } from "@prisma/client";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handlerGetFilmes(req, res);
  }
  if (req.method === 'POST') {
    return handlerPostFilmes(req, res);
  }
  res.status(405).send({});
}
// Função para lidar com requisições GET (busca de filmes)
async function handlerGetFilmes(req, res) {
  const prisma = new PrismaClient(); //instanciando prisma client para interagir com banco de dados
  try {
    const filmes = await prisma.filmes.findMany({
      include: {
        genero: true,
      },
    });
    res.status(200).json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}
//(inserção de filmes)
async function handlerPostFilmes(req, res) {
  console.log('importando filmes')
  const prisma = new PrismaClient();
  
  try {
    // requisição à API OMDB
    const response = await axios.get(`http://www.omdbapi.com/?s=Masters&apikey=${process.env.OMDB_API_KEY}&type=movie`);
    const filmesOMDB = response.data.Search;

    // Verificar se obteve resultados
    if (!filmesOMDB || filmesOMDB.length === 0) {
      return res.status(404).json({ error: 'Nenhum filme encontrado na API OMDB.' });
    }

    // Inserir filmes no banco de dados
    for (const filmeOMDB of filmesOMDB) {
        // fazendo nova consulta utilizando imdbID para obter detalhes dos filmes e conseguir salvar dentro do banco de dados 
        const detalhesFilme = await axios.get(`http://www.omdbapi.com/?i=${filmeOMDB.imdbID}&apikey=${process.env.OMDB_API_KEY}`);
        const filmeDetalhes = detalhesFilme.data;
        // extraindo generos da lista filmeDetalhes
        const generosFilmes = filmeDetalhes.Genre ? filmeDetalhes.Genre.split(',').map(g => g.trim()) : ['Desconhecido'];
        // pegando o nome do primeiro genero 
        const primeiroGenero = generosFilmes[0];
        // Verificando se o genero nao existe no banco de dados
        let generoFilme = await prisma.genero.findFirst({
            where:{
                name: primeiroGenero
            }
        });

        if (!generoFilme) {
            // caso nao exista, cria um novo genero no banco de dados
            generoFilme = await prisma.genero.create({
                data: {
                    name: primeiroGenero
                }
            });
        } 

        console.log(generoFilme.id)
        console.log(generoFilme)

        await prisma.filmes.create({
          data: {
            titulo: filmeDetalhes.Title,
            ano: filmeDetalhes.Year, 
            lancamento: filmeDetalhes.Released,
            diretor: filmeDetalhes.Director,
            generoId: generoFilme.id,
          }
        });
      }
    res.status(201).json({ message: 'Filmes importados com sucesso!' });
  } catch (error) {
    console.error('Erro ao importar filmes:', error);
    res.status(500).json({ error: 'Erro ao importar filmes' });
  }
}
