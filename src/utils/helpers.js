// Calculates total income, expenses, and balance.
export const calculateSummary = (transactions) => {
  const totals = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      if (curr.type === 'expense') acc.expense += curr.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return {
    income: totals.income,
    expenses: totals.expense,
    balance: totals.income - totals.expense,
  };
};

// Groups expenses by category for donut chart + insights (spending only).
export const getCategoryData = (transactions) => {
  const expenses = transactions.filter((tx) => tx.type === 'expense');
  const categoryMap = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const rows = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // Same order as insight: largest spend first (stable tie-break by name).
  return rows.sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
};

// Top spending category (must match donut totals; ties break alphabetically).
export const getHighestSpendingCategory = (transactions) => {
  const rows = getCategoryData(transactions);
  if (rows.length === 0) return null;

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const top = rows[0];
  const percent =
    totalExpenses > 0
      ? Math.round((top.value / totalExpenses) * 1000) / 10
      : 0;

  return {
    name: top.name,
    amount: top.value,
    percentOfTotalExpenses: percent,
    totalExpenses,
  };
};

// Returns daily income/expense trend data sorted by date.
export const getTrendData = (transactions) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const trendMap = sorted.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = { date: tx.date, income: 0, expense: 0 };
    if (tx.type === 'income') acc[tx.date].income += tx.amount;
    if (tx.type === 'expense') acc[tx.date].expense += tx.amount;
    return acc;
  }, {});

  return Object.values(trendMap);
};
