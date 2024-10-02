"use client"
import { api } from "@/api-client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Home() {

  const importMovies = async () => {
    try {
      const res = await api.post('/api/movies'); //fazendo requisição para api movies 
      alert(res.data.message);
      window.location.href = "/"; // Redirecionando para a home após a importação
    } catch (error) {
      console.error("Erro ao importar filmes:", error);
      alert("Erro ao importar filmes.");
    }
  };

  const [filmes, setFilmes] = useState([]);
  useEffect(() => {
    console.log("Home")
    api.get("api/filmes")
      .then(res => {
        console.log("Buscando filmes")
        setFilmes(res.data)
      } );
  },
  []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que quer deletar?"); // Usando window.confirm para confirmação
    if (confirmDelete) {
      try { 
        await api.delete(`/api/filmes/${id}`); // Fazendo a requisição para deletar o filme dentro da api/filmes/[id] 
        window.location.href = "/";
      } catch (error) {
        console.error("Erro ao deletar o filme:", error);
      }
    }
  };
  
  return (
    <>
      <div className="container mx-auto py-10">
        <h4 className="text-lg font-bold mb-4">Lista de Filmes</h4>
        <div className="m-3">
          <button onClick={importMovies} className="bg-emerald-700 text-white px-4 py-2 rounded mb-4">Importar Filmes</button>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-1 px-2 border-b text-left">ID</th>
              <th className="py-1 px-2 border-b text-left">Título</th>
              <th className="py-1 px-2 border-b text-left">Ano</th>
              <th className="py-1 px-2 border-b text-left">Lançamento</th>
              <th className="py-1 px-2 border-b text-left">Diretor</th>
              <th className="py-1 px-2 border-b text-left">Gênero</th>
              <th className="py-1 px-2 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map(filme => (
              <tr key={filme.id} className="hover:bg-gray-100">
                <td className="py-1 px-2 border-b">{filme.id}</td>
                <td className="py-1 px-2 border-b">{filme.titulo}</td>
                <td className="py-1 px-2 border-b">{filme.ano}</td>
                <td className="py-1 px-2 border-b">{filme.lancamento}</td>
                <td className="py-1 px-2 border-b">{filme.diretor}</td>
                <td className="py-1 px-2 border-b">{filme.genero.name}</td>
                <td className="py-1 px-2 border-b">
                  <Link href={`/filmes/${filme.id}`} passHref>
                    <button className="bg-slate-900 text-white px-2 py-1 rounded me-1">Editar</button>
                  </Link>
                  <button 
                    className="bg-slate-900 text-white px-2 py-1 rounded" 
                    onClick={() => handleDelete(filme.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-start mt-4">
          <Link href="/filmes/create" passHref>
            <button className="bg-emerald-700 text-white px-4 py-2 rounded mt-4">Adicionar Novo Filme</button>
          </Link>
          <Link href="/generos" passHref>
            <button className="bg-slate-900 text-white px-4 py-2 rounded mt-4">Ver Gêneros</button>
          </Link>
        </div>
      </div>
    </>
  );  
}


export default Home;
