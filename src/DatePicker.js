import React from 'react'
import Moment from 'moment'
import uuid from 'uuid'
import { DAYS_OF_WEEK } from './constants'
class DatePicker extends React.Component {
    constructor(){
        super()

        this.state = {
            month: 0,
            year: 0,
            yearOpen: false,
            pickerControlDate: Moment().format("MM/DD/YYYY"), // used for updating calendar without changing the input field
            monthToDisplay: Moment().format("MMM"),
            yearToDisplay: Moment().format("YYYY"),
            startGap: DAYS_OF_WEEK[Moment().startOf('month').format("dddd")],
            endGap: DAYS_OF_WEEK[Moment().endOf('month').format("dddd")], // index of last day
            daysInMonth: parseInt(Moment().endOf('month').format('DD'), 10)
        }
    }

    componentDidMount(){
        const currentMoment = this.getActiveMonth()
        const monthToDisplay = currentMoment.format("MMM")
        const yearToDisplay = currentMoment.format("YYYY")
        const startGap = DAYS_OF_WEEK[currentMoment.startOf('month').format("dddd")]
        const endGap = DAYS_OF_WEEK[currentMoment.endOf('month').format("dddd")]
        const daysInMonth = parseInt(currentMoment.endOf('month').format('DD'), 10)
        var dontChangeDayOnArrow = this.props.selectedDate.split('/')[1]
        var input = currentMoment.format("MM/DD/YYYY").split('/')
        input[1] = dontChangeDayOnArrow
        input = input.join('/')
        this.setState({
            monthToDisplay,
            yearToDisplay,
            startGap,
            daysInMonth,
            endGap,
            pickerControlDate: input
        })
    }

    componentDidUpdate(prevProps, prevState){
        const currentMoment = this.getActiveMonth()
         // when month changes on arrow left/right
         if(this.state.month !== prevState.month){
            const monthToDisplay = currentMoment.format("MMM")
            const yearToDisplay = currentMoment.format("YYYY")
            const startGap = DAYS_OF_WEEK[currentMoment.startOf('month').format("dddd")]
            const endGap = DAYS_OF_WEEK[currentMoment.endOf('month').format("dddd")]
            const daysInMonth = parseInt(currentMoment.endOf('month').format('DD'), 10)
            var dontChangeDayOnArrow = this.props.selectedDate.split('/')[1]
            var input = currentMoment.format("MM/DD/YYYY").split('/')
            input[1] = dontChangeDayOnArrow
            input = input.join('/')
            this.setState({
                monthToDisplay,
                yearToDisplay,
                startGap,
                daysInMonth,
                endGap,
                pickerControlDate: input
            })
        }

        // when date input changes
        if(this.props.inputDate !== prevProps.inputDate){
            const createWith = this.props.inputDate.length === 10 ? this.props.inputDate : this.props.selectedDate 
            const currentMoment2 =  Moment(createWith, 'MM/DD/YYYY') 
            const monthToDisplay = currentMoment2.format("MMM")
            const yearToDisplay = currentMoment2.format("YYYY")
            const startGap = DAYS_OF_WEEK[currentMoment2.startOf('month').format("dddd")]
            const endGap = DAYS_OF_WEEK[currentMoment2.endOf('month').format("dddd")]
            const daysInMonth = parseInt(currentMoment2.endOf('month').format('DD'), 10)
            this.setState({
                monthToDisplay,
                yearToDisplay,
                startGap,
                daysInMonth,
                endGap,
                pickerControlDate: this.props.selectedDate
            })
        }
    }

    onCancel(){
        this.props.changeSelectedDate(this.props.rememberDateForCancel)
        this.props.changeInputDate(this.props.rememberDateForCancel)
        this.setState({ pickerControlDate: this.props.rememberDateForCancel, month: 0 })
        this.props.closePicker()
    }

    onOk(){
        if(!this.state.yearOpen){
            this.props.changeRememberDate(this.props.inputDate)
            this.props.changeSelectedDate(this.props.inputDate)
            this.setState({ month: 0 })
            this.props.onOk(this.props.inputDate) // sends the date to the outermost DateAndTimePickerComponent
            this.props.closePicker()
        } else { 
            this.setState({ yearOpen: false, month: 0 }) 
        }

        // if(this.props.timePicker){
        //     var inputTime = this.state.inputTime.split(':')
        //     inputTime[0] = this.state.timeHr
        //     inputTime = inputTime.join(':')
        //     console.log(inputTime)

        //     this.setState({ inputTime, pickerOpen: false })
        // }
    }

    getActiveMonth(){
        return Moment(this.props.selectedDate, "MM/DD/YYYY").add(this.state.month, 'months')
    }

    changeDate(selectedDate){
        this.props.changeSelectedDate(selectedDate)
        this.props.changeInputDate(selectedDate)
        this.setState({ month: 0 })
    }

    renderCalendar(){
        var itemWidth = ((this.props.pickerWidth-12)/7)-6+'px'
        const currentMoment =  Moment(this.state.pickerControlDate, 'MM/DD/YYYY')
        const daysInPrevMonth = parseInt(this.getActiveMonth().subtract(1, 'months').endOf('month').format('DD'), 10)
        // console.log(currentMoment)
        var days = []
        // build the dates array ------
        for(var i = 0; i < this.state.startGap; i++){
            days.push(<div className="day-item extra-days" style={{ minWidth: itemWidth, mazWidth: itemWidth }} key={uuid()}>{daysInPrevMonth-i}</div>)
        }
        days.reverse()

        for(var j = 1; j <= this.state.daysInMonth; j++){
            const day = j < 10 ? `0${j}` : `${j}`
            const month = currentMoment.format("MM")
            const year = currentMoment.format("YYYY")

            const selectedDayClass = (
                parseInt(this.props.selectedDate.split('/')[0], 10) === parseInt(month, 10) &&
                parseInt(this.props.selectedDate.split('/')[1], 10) === j &&
                parseInt(this.props.selectedDate.split('/')[2], 10) === parseInt(year, 10) 
            ) ? 'active-day' : ''

            days.push(
                <div className={`day-item ${selectedDayClass}`} style={{ minWidth: itemWidth, mazWidth: itemWidth }} key={uuid()}
                    onClick={() => this.changeDate(`${month}/${day}/${year}`)}
                >
                    {j}
                </div>
            )
        }

        for(var k=1; k< (7-this.state.endGap); k++){
            days.push(<div className="day-item extra-days" style={{ minWidth: itemWidth, mazWidth: itemWidth }} key={uuid()}>{k}</div>)
        }

        return days
    }

    changeYear(year){
        var selectedDate = this.state.pickerControlDate.split('/')
        selectedDate[2] = year
        selectedDate = selectedDate.join('/')

        this.props.changeSelectedDate(selectedDate)
        this.props.changeInputDate(selectedDate)

        this.setState({ pickerControlDate: selectedDate })
    }

    renderYears(){
        const latestYear = parseInt(Moment().format("YYYY"), 10)
        const years = []

        for(var i = latestYear+2; i >= 1970; i--){
            const selectedYearClass = parseInt(this.props.selectedDate.split('/')[2], 10) === i ? 'active-year': ''
            years.push(<div key={i} className={`picker-year ${selectedYearClass}`} id={i} onClick={e => this.changeYear(e.target.id)}>{i}</div>)
        }
        return years
    }

    render(){
        // console.log(this.props)
        const invalid = this.state.monthToDisplay === 'Invalid date'
        var itemWidth = ((this.props.pickerWidth-12)/7)-6+'px'
        return (
            <React.Fragment>
                <div className="day-picker" id="day-picker" >

                    <div className="day-header">
                        {!this.state.yearOpen && <i className="fas fa-angle-left dec-month" onClick={() => this.setState({ month: this.state.month-1 })}></i>}
                        <div className="month-year" onClick={() => this.setState({ yearOpen: !this.state.yearOpen })}>
                        <div className="month-year-content">{this.state.yearOpen ? <i className="fas fa-undo-alt year-menu-btn-1"></i> : <i className="fas fa-angle-down year-menu-btn-2"></i>}{!invalid && this.state.monthToDisplay}{"  "}{this.state.yearToDisplay}{" "}</div>
                        </div>
                        {!this.state.yearOpen && <i className="fas fa-angle-right inc-month" onClick={() => this.setState({ month: this.state.month+1 })}></i>}
                    </div>

                    
                    {!this.state.yearOpen ? 
                        <React.Fragment>
                            <div className="week-days">
                                {Object.keys(DAYS_OF_WEEK).map(item => <div key={uuid()} className="week-name" style={{ minWidth: itemWidth, mazWidth: itemWidth }}>{item[0]}</div>)}
                            </div>

                            <div className="day-chart">
                                {this.renderCalendar()}
                            </div>
                        </React.Fragment>
                        :
                        <div className="picker-year-select-container">
                            {this.renderYears()}
                        </div>
                    }

                </div> 

                <div className="picker-footer"> 
                    <button className="picker-cancel" onClick={() => this.onCancel()}>CANCEL</button>
                    <button className="picker-ok" onClick={() => this.onOk()}>OK</button>
                </div>
            </React.Fragment>
        )
    }
}

export default DatePicker