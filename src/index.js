import React from 'react'
import Moment from 'moment'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'

import './index.css'

class DateOrTimeSelector extends React.Component {
    constructor(){
        super()
        this.state = {
            pickerOpen: false,

            // DatePicker state variables
            inputDate : Moment().format("MM/DD/YYYY"),
            selectedDate: Moment().format("MM/DD/YYYY"), // used for rendering DatePicker Calendar along with pickerControlDate
            rememberDateForCancel: Moment().format("MM/DD/YYYY"), // for cancel button behaviour

            // Time picker stuff
            inputTime: Moment().format("hh:mm a"),
            selectedTime: Moment().format("hh:mm a")
        }
    }

    handleDateInputChange(e){
        var inputDate = e.target.value

        this.setState({ inputDate })

        // if user enters month July as 7 and not 07, same with date
        var fixInput = inputDate.split('/')
        if(fixInput[0]<10 && !fixInput[0].includes('0')){ fixInput[0] = '0'+fixInput[0]}
        if(fixInput[1]<10 && !fixInput[1].includes('0')){ fixInput[1] = '0'+fixInput[1]}
        inputDate = fixInput.join('/')
        // after date is fixed
        if(inputDate.length === 10) {
            this.setState({ selectedDate: inputDate }) 
        }
    }

    handleTimeInputChange(e){
        var inputTime = e.target.value
        this.setState({ inputTime })
        if( inputTime.length>=6 && (inputTime.includes('am') || inputTime.includes('pm')) ) {
            // this.setState({ selectedTime: input, inputTime: input }) --- to be changed 
        }
    }

    render(){
        // console.log(this.state)
        const timePicker = this.props.timePicker || false
        const onOk = this.props.onOk ? this.props.onOk : (e) => { console.log(e)}
        const zIndex = this.props.zIndex || 1
        const isBigScreen = window.matchMedia("(min-width: 769px)").matches
        return (
            <div className="date-picker-container">
                {!timePicker ?
                    (isBigScreen ? 
                    <input className={`picker-input ${this.props.inputClass || ''}`} type="text" value={this.state.inputDate} onChange={e => this.handleDateInputChange(e)} onClick={() => this.setState({ pickerOpen: true })}/> :
                    <input readOnly className={`picker-input ${this.props.inputClass || ''}`} type="text" value={this.state.inputDate} onChange={e => this.handleDateInputChange(e)} onClick={() => this.setState({ pickerOpen: true })}/> )
                    :
                    (isBigScreen ?
                    <input className={`picker-input ${this.props.inputClass || ''}`} tpye="text"  value={this.state.inputTime} onChange={e => this.handleTimeInputChange(e)} onClick={() => this.setState({ pickerOpen: true })}/> :
                    <input readOnly className={`picker-input ${this.props.inputClass || ''}`} tpye="text"  value={this.state.inputTime} onChange={e => this.handleTimeInputChange(e)} onClick={() => this.setState({ pickerOpen: true })}/> )
                }
                {this.state.pickerOpen && 
                    <div className="mask" style={{ zIndex: zIndex-1 }}>
                        <div className="picker-container" id="picker-container" style={{ width: this.props.pickerWidth+'px', zIndex }} >
                            {!timePicker ? 
                                <DatePicker
                                    {...this.state}
                                    pickerWidth={this.props.pickerWidth || 250}
                                    onOk={onOk}
                                    changeSelectedDate={selectedDate => this.setState({ selectedDate })}
                                    changeInputDate={selectedDate => this.setState({ inputDate: selectedDate })}
                                    changeRememberDate={rememberDateForCancel => this.setState({ rememberDateForCancel })}
                                    openPicker={() => this.setState({ pickerOpen: true })}
                                    closePicker={() => this.setState({ pickerOpen: false })}
                                />
                                :
                                <TimePicker
                                    pickerWidth={this.props.pickerWidth || 250}
                                    {...this.state}
                                    onOk={onOk}
                                    changeInputTime={inputTime => this.setState({ inputTime })}
                                    changeSelectedTime={selectedTime => this.setState({ selectedTime })}
                                    openPicker={() => this.setState({ pickerOpen: true })}
                                    closePicker={() => this.setState({ pickerOpen: false })}
                                />
                            }
                            
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DateOrTimeSelector