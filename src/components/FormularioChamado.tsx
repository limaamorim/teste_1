// Define o que o formulário recebe do App.
type FormularioChamadoProps = {
  titulo: string;
  descricao: string;
  mudarTitulo: (valor: string) => void;
  mudarDescricao: (valor: string) => void;
  salvar: () => Promise<void>;
  cancelar: () => void;
};

function FormularioChamado({
  titulo,
  descricao,
  mudarTitulo,
  mudarDescricao,
  salvar,
  cancelar,
}: FormularioChamadoProps) {
  return (
    <div>
      <h2>Novo chamado</h2>

      <label>
        Título:
        <input
          value={titulo}
          onChange={(evento) => mudarTitulo(evento.target.value)}
        />
      </label>

      <label>
        Descrição:
        <textarea
          value={descricao}
          onChange={(evento) => mudarDescricao(evento.target.value)}
        />
      </label>

      <button onClick={salvar}>Salvar</button>

      <button onClick={cancelar}>Cancelar</button>
    </div>
  );
}

export default FormularioChamado;