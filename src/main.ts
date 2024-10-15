import { CountList } from "./count-by.js";
import fetchData from "./fetch-data.js";
import normalizeTransacao from "./normalize-transacao.js";
import Statistics from "./statistics.js";

const URL_API = "https://api.origamid.dev/json/transacoes.json";

function fillList(lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);

  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function completeStatistics(transacoes: Transacao[]): void {
  const data = new Statistics(transacoes);

  const totalElement = document.querySelector<HTMLElement>("#total span");

  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  fillList(data.pagamentos, "pagamento");
  fillList(data.status, "status");
  
  const bestDay = document.querySelector<HTMLElement>("#dia span");

  if (bestDay && data.bestDay) {
    bestDay.innerText = data.bestDay[0];
  }
}

function fillTable(transacaoList: Transacao[]): void {
  const tableSectionElement = document.querySelector<HTMLTableSectionElement>("#transacoes-table tbody");

  if (!tableSectionElement) {
    return;
  }
  
  transacaoList.forEach((transacao) => {
    const nomeColumn = document.createElement("td");
    nomeColumn.textContent = transacao.nome;

    const emailColumn = document.createElement("td");
    emailColumn.textContent = transacao.email;

    const moedaColumn = document.createElement("td");
    moedaColumn.textContent = (transacao.moeda ? "R$ " : "") + transacao.moeda;

    const formaPagamentoColumn = document.createElement("td");
    formaPagamentoColumn.textContent = transacao.formaPagamento;

    const statusColumn = document.createElement("td");
    statusColumn.textContent = transacao.status;

    const row = document.createElement("tr");
    row.appendChild(nomeColumn);
    row.appendChild(emailColumn);
    row.appendChild(moedaColumn);
    row.appendChild(formaPagamentoColumn);
    row.appendChild(statusColumn);

    tableSectionElement.appendChild(row);
  });
}

async function handleData(): Promise<void> {
  const data = await fetchData<TransacaoAPI[]>(URL_API);

  if (!data) {
    return;
  }

  const transacoes = data.map(normalizeTransacao);
  fillTable(transacoes);
  completeStatistics(transacoes);
}

handleData();
