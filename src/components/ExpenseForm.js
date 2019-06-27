import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';

class ExpenseForm extends React.Component {
    constructor(props){
        super(props);

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: props.expense ?  props.expense.description : '',
            note: props.expense ?  props.expense.note : '',
            amount: props.expense ?  ((props.expense.amount)/100).toString() : '',
            createdAt: props.expense ?  moment(props.expense.createdAt) : moment(),
            focused: false,
            error: ''
        };

    }

    onDescriptionChange(e){
        const description = e.target.value;
        this.setState(() => {
            return{
                description: description
            }   
        });
    }

    onNoteChange(e){
        const note = e.target.value;
        this.setState(()=>{
            return{
                note: note
            }
        });
    }

    onAmountChange(e){
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => {
                return{
                    amount: amount
                }
            });
        };
    }

    onDateChange(date){
        if(date){
            this.setState({ createdAt: date })
        }
    }

    onSubmit(e){
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            //Set error state equal to 'Please provide description and amount'
            this.setState(()=> {
                return{
                    error: 'Please provide description and amount'
                }
            })
        }else{
            this.setState(()=> {
                return{
                    error: ''
                }
            })
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10)*100, // in cents not dollars
                createdAt: this.state.createdAt.valueOf() 
            });
        }
    }

    render() {
        return (
            <div>
                {!!this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type='text' placeholder='Description' autoFocus value={this.state.description}onChange={this.onDescriptionChange} />
                    <input type='text' placeholder='Amount' value={this.state.amount} onChange={this.onAmountChange} autoFocus />
                    <SingleDatePicker
                        date={this.state.createdAt} // momentPropTypes.momentObj or null
                        onDateChange={this.onDateChange} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState(() => ({ focused }))} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea placeholder='Add a note for your expense(optional)' value={this.state.note} onChange={this.onNoteChange}></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}



export default ExpenseForm;