export default function currencyToNumber(currency: string): number | null {
  if (!currency) {
    return null;
  }

  const value = Number(currency.replaceAll(".", "").replace(",", "."));

  if (isNaN(value)) {
    return null;
  } else {
    return value;
  }
}
