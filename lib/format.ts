export function formatMga(amount: number): string {
  if (isNaN(amount)) return "0 Ar";
  const formatted = new Intl.NumberFormat("fr-MG", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} Ar`;
}

export function formatMgaFull(amount: number): string {
  if (isNaN(amount)) return "0 MGA";
  const formatted = new Intl.NumberFormat("fr-MG", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} MGA`;
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `LNK-${year}${month}-${random}`;
}

