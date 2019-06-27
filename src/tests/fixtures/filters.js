import moment from 'moment'; 

let filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

let altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export {filters, altFilters};