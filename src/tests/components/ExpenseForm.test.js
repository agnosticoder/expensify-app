import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker} from 'react-dates';




test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

//should render ExpenseFrom with expense data
test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

//should render error for invalid form submission
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    //Pass second argument to simulate to prevent the error of "cannot read property preventDefault of undefined"
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Please provide description and amount');
    expect(wrapper).toMatchSnapshot();
});

//should set description on input change
test('should set description on input change', () => {
    //1. Render ExpenseForm
    const wrapper = shallow(<ExpenseForm />);
    //2. Change the input
    const value = 'New Description';
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
    //3. Make an assersion checking that the description state was set
    expect(wrapper).toMatchSnapshot();
});

//should set note on textarea change
test('should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm />);

    const value = 'This is a fantastic note for the fantastic expense';

    wrapper.find('textarea').simulate('change', {
        target:{
            value
        }
    });

    expect(wrapper.state('note')).toBe(value);

    expect(wrapper).toMatchSnapshot();
});

//should set amount if valid input
//23.50
test('should set amount if valid input', () => {
    const wrapper = shallow(<ExpenseForm />);

    const value = '23.50';

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});


//shoud not set amount if invalid input
//12.224
test('should not set amount if invalid input', () => {
    const wrapper = shallow(<ExpenseForm />);

    const value = '12.224';

    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop on valid form submission', () => {
    //Now we are creating a "Test Spy" to simulate the role of actual functions in code, we can assert if the function is called it is called 5 times or it is called with required arguments
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[1].description,
        note: expenses[1].note,
        amount: parseFloat(expenses[1].amount, 10), // in cents not dollars
        createdAt: expenses[1].createdAt.valueOf() 
    });
});

//should set new date on date change
//To call the the prop inside the component with the method 'prop([key])' of 'enzyme'
test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});
    expect(wrapper.state('focused')).toBe(true);
});