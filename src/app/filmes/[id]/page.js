"use client";
import { api } from "@/api-client";
import { useState, useEffect } from "react";

function EditFilme({ params }) {
  const [filme, setFilme] = useState({
    titulo: "",
    ano: "",
    lancamento: "",
    diretor: "",
    generoId: "",
  });

  const { id } = params; // Usamos params para pegar o ID da URL

  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    // Buscar os dados do filme pelo ID
    api.get(`/api/filmes/${id}`)
      .then((res) => {
        setFilme(res.data); // Preenche o formulário com os dados do filme
      })
      .catch((err) => {
        console.error("Erro ao buscar o filme:", err);
      });

    // Buscar todos os gêneros
    api.get('/api/generos') 
      .then((res) => {
        setGeneros(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar gêneros:", err);
      });
  }, [id]);

  // Função para atualizar o estado conforme o usuário edita os campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilme({ ...filme, [name]: value }); // Atualiza o campo específico
  };

  // Função para enviar o formulário e salvar os novos dados
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Verifica se o generoId está corretamente definido antes de enviar
    if (!filme.generoId) {
      console.error("Gênero não selecionado");
      return;
    }
  
    // Envia o filme com o generoId atualizado para a API
    api.put(`/api/filmes/${id}`, {
      ...filme,
      generoId: parseInt(filme.generoId) // Converte para número caso esteja como string
    })
    .then((res) => {
      console.log("Filme atualizado com sucesso");
      window.location.href = "/"; // Redireciona após o sucesso
    })
    .catch((err) => {
      console.error("Erro ao atualizar o filme:", err);
    });
  };
  return (
    <div className="container mx-auto py-10">
      <h4 className="text-lg font-bold mb-4">Editar Filme</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            name="titulo"
            value={filme.titulo}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Ano</label>
          <input
            type="text"
            name="ano"
            value={filme.ano}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Lançamento</label>
          <input
            type="text"
            name="lancamento"
            value={filme.lancamento}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Diretor</label>
          <input
            type="text"
            name="diretor"
            value={filme.diretor}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Gênero</label>
          <select
            name="generoId"
            value={filme?.generoId}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full">
            <option value=""></option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default EditFilme;
