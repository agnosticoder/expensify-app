import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


export class ExpenseListFilters extends React.Component{
    constructor(props){
        super(props);

        this.onDatesChange = this.onDatesChange.bind(this);

        this.state = {
            focusedInput: null
        }
    }

    onDatesChange({startDate, endDate}){
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    

    render() {
        return (
            <div>
                <input type='text' value={this.props.filters.text} onChange={(e) => {
                    this.props.setTextFilter(e.target.value);
                }} />
                <select value={this.props.filters.sortBy} onChange={(e) => {
                    if (e.target.value === 'date') {
                        this.props.sortByDate();
                    } else {
                        this.props.sortByAmount();
                    }
                }}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates= {true}
                />
            </div>
        );

    }
}

const getState = (state) => {
    return  {
        filters: state.filters
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount())
    }
};

export default connect(getState, mapDispatchToProp)(ExpenseListFilters);