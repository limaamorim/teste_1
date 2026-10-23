import type { Cr2cd_chamados } from "../generated/models/Cr2cd_chamadosModel";

// Define os dados que esse componente precisa receber.
type TabelaChamadosProps = {
  chamados: Cr2cd_chamados[];
};

// Recebe a lista enviada pelo App.
function TabelaChamados({ chamados }: TabelaChamadosProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
        </tr>
      </thead>

      <tbody>
        {/* Cria uma linha para cada chamado recebido. */}
        {chamados.map((chamado) => (
          <tr key={chamado.cr2cd_chamadoid}>
            <td>{chamado.cr2cd_titulo}</td>
            <td>{chamado.cr2cd_descricao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaChamados;