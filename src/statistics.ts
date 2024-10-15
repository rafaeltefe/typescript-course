import countBy from "./count-by.js";

function filterValue(transacao: Transacao): transacao is Transacao & { valor: number } {
  return transacao.valor !== null;
}

export default class Statistics {
  private transacoes;
  total;
  pagamentos;
  status;
  week;
  bestDay;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamentos = this.setPagamento();
    this.status = this.setStatus();
    this.week = this.setWeek();
    this.bestDay = this.setBestDay();
  }

  private setTotal() {
    return this.transacoes.filter(filterValue).reduce((total, item) => {
      return total + item.valor;
    }, 0);
  }

  private setPagamento() {
    return countBy(this.transacoes.map(({ formaPagamento }) => formaPagamento));
  }

  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }

  private setWeek() {
    const week = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };

    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();

      if (day === 0) week["Domingo"] += 1;
      if (day === 1) week["Segunda"] += 1;
      if (day === 2) week["Terça"] += 1;
      if (day === 3) week["Quarta"] += 1;
      if (day === 4) week["Quinta"] += 1;
      if (day === 5) week["Sexta"] += 1;
      if (day === 5) week["Sábado"] += 1;
    }

    return week;
  }

  private setBestDay() {
    return Object.entries(this.week).sort((a, b) => {
      return b[1] - a[1];
    }).at(0);
  }
}
