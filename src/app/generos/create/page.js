"use client";
import { api } from "@/api-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateGenero = () => {
    const [name, setName] = useState('');
    const router = useRouter();
  
    //função para enviar dados para o banco de dados
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        try {
          const newGenero = { name };
          await api.post('/api/generos', newGenero); // Envia os dados para a API
          router.push('/generos'); // Redireciona para a página inicial após a criação
        } catch (error) {
          console.error("Erro ao adicionar o genero:", error);
        }
      };

    return (
      <div className="container mx-auto py-10">
        <h2 className="text-lg font-bold mb-4">Adicionar Novo Gênero</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Nome do Gênero:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} //para conseguir digitar no campo
              className="border p-2"
              required
            />
          </div>
          <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded">
            Adicionar Gênero
          </button>
        </form>
      </div>
    );
  };
  
  export default CreateGenero;
