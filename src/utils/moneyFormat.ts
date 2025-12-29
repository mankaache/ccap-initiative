export function formatBudget(amount:any) {
  if (amount >= 1_000_000_000_000) {
    return `${(amount / 1_000_000_000_000).toFixed(1)} Trillion`;
  }

  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)} Billion`;
  }

  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} Million`;
  }

  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)} Thousand`;
  }

  return amount.toString();
}
