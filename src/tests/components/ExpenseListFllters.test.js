import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters} from "../fixtures/filters";

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    
    wrapper = shallow(
    <ExpenseListFilters 
    filters={filters} 
    setTextFilter={setTextFilterSpy} 
    sortByDate={sortByDateSpy}
    sortByAmount={sortByAmountSpy}
    setStartDate={setStartDateSpy}
    setEndDate={setEndDateSpy}
    />);
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    // We can change the filters prop value to some other value with the help of method "setProps(props) => Self" that enzyme gives us
    wrapper.setProps({filters: altFilters});
    expect(wrapper).toMatchSnapshot();
});

//should handle text change
test('should handle text changes', () => {
    wrapper.setProps({filters: altFilters});
    wrapper.find('input').simulate('change',{
        target: {
            value: altFilters.text
        }
    })
    expect(setTextFilterSpy).toHaveBeenCalledWith('bills');
    expect(wrapper.find('input').prop('value')).toBe('bills');
});

//should sort by date
test('should sort by date', () => {
    wrapper.find('select').simulate('change',{
        target: {
            value: filters.sortBy
        }
    });
    expect(sortByDateSpy).toHaveBeenCalled();
});

//should sort by amount
test('should sort by amount', () => {
    wrapper.find('select').simulate('change',{
        target: {
            value: altFilters.sortBy
        }
    });
    expect(sortByAmountSpy).toHaveBeenCalled();
});

//should handle date changes
test('should handle date change', () => {
    wrapper.setProps({filters: altFilters});
    const startDate = altFilters.startDate;
    const endDate = altFilters.endDate;
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDateSpy).toHaveBeenCalledWith(startDate);
    expect(setEndDateSpy).toHaveBeenCalledWith(endDate);
});

//should handle date focus changes
test('should handle date focus change', () => {
    const focusedInput = 'endDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate');
    expect(wrapper.state('focusedInput')).toBe(focusedInput);
});


