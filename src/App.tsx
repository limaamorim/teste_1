import { useEffect, useState } from "react";

// Serviço já gerado: faz a comunicação com o Dataverse.
import { Cr2cd_chamadosService } from "./generated/services/Cr2cd_chamadosService";

// Tipo já gerado: descreve os campos de um chamado.
import type { Cr2cd_chamados } from "./generated/models/Cr2cd_chamadosModel";

function App() {
  // Guarda a lista de chamados. Ela começa vazia.
  const [chamados, setChamados] = useState<Cr2cd_chamados[]>([]);

  // Guarda uma mensagem que será mostrada na tela.
  const [mensagem, setMensagem] = useState("Carregando chamados...");

  useEffect(() => {
    // A consulta demora um pouco, por isso usamos async e await.
    async function carregarChamados() {
      try {
        // Busca os registros no Dataverse.
        // Mostra se a função chegou até a consulta.
        console.log("1 - Iniciando consulta ao Dataverse");

        const resultado = await Cr2cd_chamadosService.getAll();

        // Só aparece quando a consulta retorna uma resposta.
        console.log("2 - Resposta do Dataverse:", resultado);

        if (!resultado.success) {
          // Mostra os detalhes da falha no console do navegador.
          console.log("Erro do Dataverse:", resultado.error);

          // Mostra a mensagem retornada pelo Dataverse na tela.
          setMensagem(
            resultado.error?.message ?? "Não foi possível carregar os chamados."
          );

          return;
        }

        // Guarda os registros no estado. Se não vierem dados, usa [].
        const lista = resultado.data ?? [];
        setChamados(lista);

        setMensagem(
          lista.length === 0 ? "Nenhum chamado encontrado." : ""
        );
      } catch {
        // Trata uma falha durante a comunicação.
        setMensagem("Erro ao consultar o Dataverse.");
      }
    }

    carregarChamados();
  }, []); // Executa ao montar a tela, não a cada atualização do estado.

  return (
    <main>
      <h1>Meus chamados</h1>

      <p>{mensagem}</p>

      <ul>
        {/* Para cada chamado, cria um item na lista da tela. */}
        {chamados.map((chamado) => (
          <li key={chamado.cr2cd_chamadoid}>
            <h2>{chamado.cr2cd_titulo}</h2>
            <p>{chamado.cr2cd_descricao}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;