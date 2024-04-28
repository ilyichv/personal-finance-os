export function formatAmount(amount: number, type: "income" | "outcome") {
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return type === "income" ? `${value}` : `-${value}`;
}
