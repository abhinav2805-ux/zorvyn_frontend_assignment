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

// Groups expenses by category for donut chart rendering.
export const getCategoryData = (transactions) => {
  const expenses = transactions.filter((tx) => tx.type === 'expense');
  const categoryMap = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));
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
