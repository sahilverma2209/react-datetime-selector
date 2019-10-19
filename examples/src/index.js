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
            <div style={{display: 'flex', width: '40%', justifyContent: 'space-between', margin: '0 auto', paddingTop: '100px'}}>
                <DateOrTimeSelector 
                    timePicker={true}
                    onOk={value => this.setState({ selectedTime: value})}
                />
                <DateOrTimeSelector 
                    onOk={value => this.setState({ selectedDate: value})}
                />
            </div>
        )
    }
    
}

render(<App />, document.getElementById("root"));
