import { useEffect, useState } from "react";

import { Cr2cd_chamadosService } from "../generated/services/Cr2cd_chamadosService";

import type { Cr2cd_chamados } from "../generated/models/Cr2cd_chamadosModel";

export function useChamados() {
  // Estados que antes ficavam no App.
  const [chamados, setChamados] = useState<Cr2cd_chamados[]>([]);
  const [mensagem, setMensagem] = useState("Carregando chamados...");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    async function carregarChamados() {
      try {
        const resultado = await Cr2cd_chamadosService.getAll();

        if (!resultado.success) {
          setMensagem(
            resultado.error?.message ?? "Não foi possível carregar os chamados."
          );
          return;
        }

        const lista = resultado.data ?? [];
        setChamados(lista);

        setMensagem(
          lista.length === 0 ? "Nenhum chamado encontrado." : ""
        );
      } catch {
        setMensagem("Erro ao consultar o Dataverse.");
      }
    }

    carregarChamados();
  }, []);

  async function criarChamado() {
    if (titulo.trim() === "" || descricao.trim() === "") {
      setMensagem("Preencha o título e a descrição.");
      return;
    }

    try {
      const resultado = await Cr2cd_chamadosService.create({
        cr2cd_titulo: titulo.trim(),
        cr2cd_descricao: descricao.trim(),
        statecode: 0,
      });

      if (!resultado.success) {
        setMensagem(
          resultado.error?.message ?? "Não foi possível criar o chamado."
        );
        return;
      }

      setTitulo("");
      setDescricao("");
      setMostrarFormulario(false);

      // O chamado já foi criado. Agora atualizamos a lista.
      try {
        const resultadoLista = await Cr2cd_chamadosService.getAll();

        if (!resultadoLista.success) {
          setMensagem("Chamado criado, mas não foi possível atualizar a lista.");
          return;
        }

        setChamados(resultadoLista.data ?? []);
        setMensagem("Chamado criado!");
      } catch {
        setMensagem("Chamado criado, mas não foi possível atualizar a lista.");
      }
    } catch {
      setMensagem("Erro ao criar o chamado.");
    }
  }

  // Disponibiliza os valores e as funções para o App.
  return {
    chamados,
    mensagem,
    mostrarFormulario,
    setMostrarFormulario,
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    criarChamado,
  };
}