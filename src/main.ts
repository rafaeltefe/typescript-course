import fetchData from "./fetch-data.js";
import normalizeTransacao from "./normalize-transacao.js";

const URL_API = "https://api.origamid.dev/json/transacoes.json";

async function handleData(): Promise<void> {
  const data = await fetchData<TransacaoAPI[]>(URL_API);

  if (!data) {
    return;
  }

  const transacoes = data.map(normalizeTransacao);
  console.log(transacoes);
}

handleData();
