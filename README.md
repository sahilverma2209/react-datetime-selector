# react-datetime-selector
A simple Calendar and Time picker component which lets user pick Date/Time through a visual interface.
This component uses [Moment.js](https://momentjs.com/) behind the scenes for rendering the calendar and for re-rendering it when the user interacts.


# Installation

```
npm install react-datetime-selector
```

# Usage

The component imported is called **DateOrTimePicker**. As the name suggests, it can be used for both - picking date or picking time.
The mode of use (date or time) is determined by passing prop ```timePicker={true}``` If this prop is not passed it renders the Date Picker by default.

To use the component, simply import it on the top of the file and use **<DateOrTimePicker />** to render

**Please Note :**

It is Important to import it as :

```js
import DateOrTimeSelector from '../node_modules/react-datetime-selector/dist/index'
```

**Important:*** Please add the relative reference to the node_modules folder according to your directory setup

## Example:

```js
import DateOrTimeSelector from '../node_modules/react-datetime-selector/dist/index'

class App extends React.Component {
  constructor(){
    super()
    
    this.state = {
      selectedDate='',
      selectedTime=''
    }
  }
  
  handleSelectedDate(selectedDate){
  
    // can convert to JavaScript Date Object if fancied
    var date = Date.parse(selectedDate) // returns milliseconds since January 1, 1970, 00:00:00 UTC
    date = new Date(date) // creates JavaScript Date Object
    
    // do whatever else with it here (setState etc)
    this.setState({ selectedDate })
    
  }
  
  render(){
    return(
      <div>
        // Date Picker
        <DateOrTimePicker
          onOk={selectedDate => {
            // do stuff here
            this.setState({ selectedDate })
          }}
        />
        // Time Picker
        <DateOrTimePicker
          timePicker={true}
          onOk={selectedDate => this.handleSelectedDate(selectedDate)}
        />
        
      </div>
    )
  }
}

```

You'll need to pass the prop ```onOk``` which is a function that takes the selected date/time as its argument. After recieveing the date/time in this function you can do whatever you please. 

# Date Time Format

Currently, the date is returned in the format "MM/DD/YYYY" ie ```js"12/31/2019"``` 
and the time is returned in the format "hh:mm a" ie ```js"04:20 pm"``` 

Both of them are returned as Strings.

To create a Date object out of a string, you can do the following : 

```js
var x = "12/31/2019"
var date = Date.parse(x) // returns milliseconds since January 1, 1970, 00:00:00 UTC
date = new Date(date) // creates JavaScript Date Object

```






