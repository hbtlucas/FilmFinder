import axios from 'axios';

export const api = axios.create();

// Função para buscar filmes no OMDB com base no título e na página
export const fetchMoviesFromOMDB = async (title, page = 1) => {

  const API_KEY = process.env.OMDB_API_KEY;
  // - 's' para o título do filme
  // - 'apikey' para autenticação
  // - 'page' para a paginação dos resultados
  const url = `http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`;
  try {
    const response = await axios.get(url);
    if (response.data.Response === 'True') {
      return response.data.Search; // Retorna array de filmes
    } else {
      console.error(response.data.Error);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes do OMDB:", error);
    return [];
  }
};
