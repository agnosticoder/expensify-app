const getExpensesTotal = (expenses = []) => {
    return expenses.reduce((accumulator, currentExpense) => {
        return accumulator + currentExpense.amount;
    },0)
};

export default getExpensesTotal;