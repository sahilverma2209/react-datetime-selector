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
        // console.log(this.state)
        return (
            <div style={{display: 'flex', width: '40%', justifyContent: 'space-between', margin: '0 auto', paddingTop: '100px', fontSize: '16px', fontFamily: '\'Lato\', sans-serif', fontWeight: '200'}}>
                <div>
                    Date Picker <br/><br/>
                    <DateOrTimeSelector 
                        pickerWidth={280}
                        zIndex={8}
                        onOk={value => this.setState({ selectedDate: value})}
                    />
                </div>
                <div>
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
