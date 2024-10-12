import currencyToNumber from "./currency-to-number.js";
import stringToDate from "./string-to-date.js";

declare global {
  type FormaPagamentoType = "Boleto" | "Cartão de Crédito";
  type StatusType = 
    | "Paga"
    | "Recusada pela operadora de cartão"
    | "Estornada"
    | "Aguardando pagamento";

  interface TransacaoAPI {
    ["Cliente Novo"]: number;
    Data: string;
    Email: string;
    ["Forma de Pagamento"]: FormaPagamentoType;
    ID: number;
    Nome: string;
    Status: StatusType;
    ["Valor (R$)"]: string;
  }

  interface Transacao {
    isClienteNovo: boolean;
    data: Date;
    email: string;
    formaPagamento: FormaPagamentoType;
    id: number;
    nome: string;
    status: StatusType;
    moeda: string;
    valor: number | null;
  }
}

export default function normalizeTransacao(transacao: TransacaoAPI): Transacao {
  return {
    isClienteNovo: Boolean(transacao["Cliente Novo"]),
    data: stringToDate(transacao.Data),
    email: transacao.Email,
    formaPagamento: transacao["Forma de Pagamento"],
    id: transacao.ID,
    nome: transacao.Nome,
    status: transacao.Status,
    moeda: transacao["Valor (R$)"],
    valor: currencyToNumber(transacao["Valor (R$)"])
  }
}
