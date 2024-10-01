"use client";
import { api } from "@/api-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Create = () => {
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [lancamento, setLancamento] = useState('');
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');
    const router = useRouter();

    const [generos, setGeneros] = useState([]); //estado para armazenar os generos 

    useEffect(() => { //buscar generos na api generos e poder listar as opções de generos no select box
      const fetchGeneros = async () => {
        try {
          const res = await api.get('/api/generos'); 
          setGeneros(res.data); // Armazena os gêneros no estado
        } catch (error) {
          console.error("Erro ao buscar gêneros:", error);
        }
      };
    
      fetchGeneros();
    }, []);
    
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Evita o comportamento padrão do formulário
      try {
        const newFilm = { titulo, ano, lancamento, diretor, generoId };
        await api.post('/api/filmes', newFilm); // Envia os dados para a API
        router.push('/'); // Redireciona para a página inicial após a criação
      } catch (error) {
        console.error("Erro ao adicionar o filme:", error);
      }
    };
  
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-lg font-bold mb-4">Adicionar Novo Filme</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Ano:</label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Data de Lançamento:</label>
            <input
              type="date"
              value={lancamento}
              onChange={(e) => setLancamento(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Diretor:</label>
            <input
              type="text"
              value={diretor}
              onChange={(e) => setDiretor(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block">Gênero:</label>
            <select
              value={generoId}
              onChange={(e) => setGeneroId(e.target.value)}
              className="border p-2 w-full"
              required>
                <option value="" disabled>Selecione um gênero</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.name}
                  </option>
                ))}
              </select>
          </div>

          <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded">
            Adicionar Filme
          </button>
        </form>
      </div>
    );
  };
  
  export default Create;
