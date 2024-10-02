"use client";
import { api } from "@/api-client";
import { useState, useEffect } from "react";

function EditGenero({ params }) {
  const [genero, setGenero] = useState({
    name: "",
  });

  const { id } = params; // Usamos params para pegar o ID da URL

  useEffect(() => {
    // Buscar o gênero pelo ID
    api.get(`/api/generos/${id}`)
      .then((res) => {
        setGenero(res.data); // Preenche o formulário com os dados do gênero
      })
      .catch((err) => {
        console.error("Erro ao buscar o genero:", err);
      });
  }, [id]); //tem que ter esse id aqui pra que o useeffect não faça varias requisições
  // Função para atualizar o estado conforme o usuário edita os campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenero({ ...genero, [name]: value });
    // Atualiza o campo específico
  };

  // Função para enviar o formulário e salvar os novos dados
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envia o filme com o generoId atualizado para a API
    api.put(`/api/generos/${id}`, {
      ...genero,
    })
    .then((res) => {
      console.log("Genero atualizado com sucesso");
      window.location.href = "/generos"; // Redireciona após o sucesso
    })
    .catch((err) => {
      console.error("Erro ao atualizar o genero:", err);
    });
  };
  return (
    <div className="container mx-auto py-10">
      <h4 className="text-lg font-bold mb-4">Editar Genero</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nome:</label>
          <input
            type="text"
            name="name"
            value={genero.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default EditGenero;
