import React from 'react';
import { render} from 'react-dom';
import DateOrTimeSelector from '../../src';

import './example.css'

class App extends React.Component {
    constructor(){
        super()

        this.state = {
            selectedTime: '',
            selectedDate: '',
            datePickerOpen: false
        }
    }

    render(){
        // console.log(this.state)
        
        return (
            <div className="demo-container">
                <div className="demo-1">
                    Date Picker <br/><br/>
                    <DateOrTimeSelector
                        datePickerOpen={this.state.datePickerOpen} 
                        pickerWidth={280}
                        zIndex={8}
                        onOk={value => this.setState({ selectedDate: value})}
                    />
                </div>
                <div className="demo-1">
                    Time Picker <br/><br/>
                    <DateOrTimeSelector 
                        timePicker={true}
                        onOk={value => this.setState({ selectedTime: value})}
                    />
                </div>
            </div>
        )
    }
    
}

render(<App />, document.getElementById("root"));
