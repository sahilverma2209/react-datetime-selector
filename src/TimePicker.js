import React from 'react'
import Moment from 'moment'
import ScrollSelect from './ScrollSelect'
import { HRS, MINUTES, AMPM } from './constants'

class TimePicker extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            time: Moment().format("hh:mm a"),
            hr: this.props.selectedTime.split(':')[0],
            min: this.props.selectedTime.split(':')[1].split(' ')[0],
            amPm: this.props.selectedTime.split(':')[1].split(' ')[1] === 'am' ? 0 : 1
        }

    }

    async onOk(){
        // console.log(this.state.hr, this.state.min, this.state.amPm)
        var time = `${this.state.hr}:${this.state.min} ${this.state.amPm}`
        time = Moment(time, "hh:mm a").format("hh:mm a")
        this.props.changeSelectedTime(time)
        this.props.changeInputTime(time)
        await this.setState({ time, hr: time.split(':')[0], min: time.split(':')[1].split(' ')[0], amPm: time.split(':')[1].split(' ')[1]})
        this.props.onOk(time)
        this.props.closePicker()
    }

    onCancel(){
        this.props.closePicker()
    }

    render(){
        // console.log(this.props)
        return(
            <React.Fragment>
                <div className="time-picker">
                    <div className="time-header">
                        <div className="month-year">
                            <div className="month-year-content">Time</div>
                        </div>
                    </div>

                    <div className="time-edit-container">
                        <ScrollSelect
                            data={HRS}
                            height={40}
                            fontSize={13}
                            defaultSelection={parseInt(this.state.hr, 10)-1} // index of item that should be selected
                            parentHeight={250} //time-edit-container height
                            updateSelection={hr => this.setState({ hr: parseInt(HRS[hr],10) })}
                            scrollerId="scroll-select-hr"
                        />
                        <ScrollSelect
                            data={MINUTES}
                            height={40}
                            fontSize={13}
                            defaultSelection={parseInt(this.state.min, 10)}
                            parentHeight={250}
                            updateSelection={min => this.setState({ min: parseInt(MINUTES[min],10) })}
                            scrollerId="scroll-select-min"
                        />
                        <ScrollSelect
                            data={AMPM}
                            height={40}
                            fontSize={13}
                            defaultSelection={parseInt(this.state.amPm, 10)}
                            parentHeight={250}
                            updateSelection={ampm => this.setState({ amPm: AMPM[ampm] })}
                            scrollerId="scroll-select-ampm"
                        />
                    </div>
                </div>

                <div className="picker-footer"> 
                    <button className="picker-cancel" onClick={() => this.onCancel()}>CANCEL</button>
                    <button className="picker-ok" onClick={() => this.onOk()}>OK</button>
                </div>
            </React.Fragment>
        )
    }
}

export default TimePicker