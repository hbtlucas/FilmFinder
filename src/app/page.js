"use client"
import { api } from "@/api-client";
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

function Home() {

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
        setFilmes(filmes.filter(filme => filme.id !== id)); // Remove da lista de filmes na interface
      } catch (error) {
        console.error("Erro ao deletar o filme:", error);
      }
    }
  };
  
  return (
    <>
     <div className="container mx-auto py-10">
      <h4 className="text-lg font-bold mb-4">Lista de Filmes</h4>
      <table className="min-w-full bg-white border border-gray-400">
        <thead >
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Título</th>
            <th className="py-2 px-4 border-b">Ano</th>
            <th className="py-2 px-4 border-b">Lançamento</th>
            <th className="py-2 px-4 border-b">Diretor</th>
            <th className="py-2 px-4 border-b">Gênero</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map(filme => (
            <tr key={filme.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{filme.id}</td>
              <td className="py-2 px-4 border-b">{filme.titulo}</td>
              <td className="py-2 px-4 border-b">{filme.ano}</td>
              <td className="py-2 px-4 border-b">{filme.lancamento}</td>
              <td className="py-2 px-4 border-b">{filme.diretor}</td>
              <td className="py-2 px-4 border-b">{filme.genero.name}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/filmes/${filme.id}`} passHref>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded me-2">Editar</button>
                </Link>
                <button 
                  className="bg-red-600 text-white px-4 py-2 rounded" 
                  onClick={() => handleDelete(filme.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="m-3">
          <Link href="/filmes/create" passHref>
            <button className="bg-emerald-700 text-white px-4 py-2 rounded mt-4">Adicionar Novo Filme</button>
          </Link>
        </div>
        <div className="m-3">
          <Link href="/generos/create" passHref>
            <button className="bg-emerald-700 text-white px-4 py-2 rounded mt-4">Adicionar Novo Gênero</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}


export default Home;
