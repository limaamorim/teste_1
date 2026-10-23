import TabelaChamados from "./components/TabelaChamados";
import FormularioChamado from "./components/FormularioChamado";
import { useChamados } from "./hooks/useChamados";

function App() {
  // Chama o hook e recebe os estados e as funções.
  const {
    chamados,
    mensagem,
    mostrarFormulario,
    setMostrarFormulario,
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    criarChamado,
  } = useChamados();

  return (
    <main>
      <h1>Meus chamados</h1>

      <button onClick={() => setMostrarFormulario(true)}>
        Novo chamado
      </button>

      {mostrarFormulario && (
        <FormularioChamado
          titulo={titulo}
          descricao={descricao}
          mudarTitulo={setTitulo}
          mudarDescricao={setDescricao}
          salvar={criarChamado}
          cancelar={() => setMostrarFormulario(false)}
        />
      )}

      <p>{mensagem}</p>

      <TabelaChamados chamados={chamados} />
    </main>
  );
}

export default App;