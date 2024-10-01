"use client"
import { api } from "@/api-client";
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

function ListGeneros() {
  
const [generos, setGeneros] = useState([]); //estado para armazenar os generos 

useEffect(() => { //buscar generos na api generos e poder listar as opções de generos no select box
    const fetchGeneros = async () => {
      try {
        const res = await api.get('/api/generos'); 
        setGeneros(res.data); // Armazena os gêneros no estado
        console.log(res.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };
  
    fetchGeneros();
  }, []);

  return (
    <>
     <div className="container mx-auto py-10">
      <h4 className="text-lg font-bold mb-4">Lista de Filmes</h4>
      <table className=" bg-white border border-gray-400">
        <thead >
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
            {generos.map(genero => (
            <tr key={genero.id}>
              <td className="py-2 px-4 border-b">{genero.id}</td>
              <td className="py-2 px-4 border-b">{genero.name}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/generos/${genero.id}`} passHref> 
                  <button className="bg-slate-900 text-white px-4 py-2 rounded me-2">Editar</button>
                </Link>
                <button 
                  className="bg-slate-900 text-white px-4 py-2 rounded" 
                  onClick={() => handleDelete()}>
                  Deletar
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-start">
        <div className="m-3">
          <Link href="/generos/create" passHref>
            <button className="bg-emerald-700 text-white px-4 py-2 rounded mt-4">Adicionar Novo Gênero</button>
          </Link>
        </div>
        <div className="m-3">
          <Link href="/" passHref>
            <button className="bg-slate-900 text-white px-4 py-2 rounded mt-4">Ver filmes</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}


export default ListGeneros;
