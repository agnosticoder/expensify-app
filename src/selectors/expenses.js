import moment from 'moment';
// Timestamps (milliseconds)
// 0 timestamp = 1st January, 1970, 12AM (unix epoch)
//==============================================================================Get Filtered Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });   
};

export default getVisibleExpenses;