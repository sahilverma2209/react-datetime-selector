import React from 'react';
import { render} from 'react-dom';
import DateOrTimeSelector from '../../src';

class App extends React.Component {
    constructor(){
        super()

        this.state = {
            selectedTime: '',
            selectedDate: ''
        }
    }

    render(){
        console.log(this.state)
        return (
            <React.Fragment>
                <DateOrTimeSelector 
                    timePicker={true}
                    onOk={value => this.setState({ selectedTime: value})}
                />
                <DateOrTimeSelector 
                    onOk={value => this.setState({ selectedDate: value})}
                />
            </React.Fragment>
        )
    }
    
}

render(<App />, document.getElementById("root"));
