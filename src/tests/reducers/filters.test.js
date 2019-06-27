import filtersReducer from '../../reducers/filters';
import moment from 'moment';


test('should setup default filter values', () => {
    //Inital state of the Redux Store can be tested with the action of type '@@INIT' which also can be seen from the Redux Developer Tool
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'someText'
    };

    const result = filtersReducer(undefined, action);

    expect(result).toEqual({
        text: 'someText',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to date', () => {
    const currentState = {
        text:'',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }

    const action = {
        type: 'SORT_BY_DATE'
    }
    const result = filtersReducer(currentState, action);
    expect(result).toEqual({
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    })
});

test('should set sortBy to amount', () => {
    const action = {
        type: 'SORT_BY_AMOUNT'
    }
    const result = filtersReducer(undefined, action);
    expect(result).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set startDate filter', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(456)
    };
    const result = filtersReducer(undefined, action);
    expect(result).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment(456),
        endDate: moment().endOf('month')
    })
});

test('should set endDate filter', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(654)
    };
    const result = filtersReducer(undefined, action);
    expect(result).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment(654)
    })
});
