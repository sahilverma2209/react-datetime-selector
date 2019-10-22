# react-datetime-selector
A simple Calendar and Time picker component which lets user pick Date/Time through a visual interface.
This component uses [Moment.js](https://momentjs.com/) behind the scenes for rendering the calendar and for re-rendering it when the user interacts.


Find the [Demo here](https://sahilverma2209.github.io/react-datetime-selector/)

# Installation

```
npm install react-datetime-selector
```

# Usage

The component imported is called **DateOrTimePicker**. As the name suggests, it can be used for both - picking date or picking time.
The mode of use (date or time) is determined by passing prop ```timePicker={true}``` If this prop is not passed it renders the Date Picker by default.

To use the component, simply import it on the top of the file and use **<DateOrTimePicker />** to render

**Please Note :**

1. It is Important to import it as :

```js
import DateOrTimeSelector from '../node_modules/react-datetime-selector/dist/index'
```
**Important:*** Please add the relative reference to the node_modules folder according to your directory setup

2. It uses [Fontawesome]() for icons, therefore please [add Fontawesome 4](https://fontawesome.com/v4.7.0/get-started/) or [add Fontawesome 5](https://fontawesome.com/start) to your project.

It is advisable to submit your email and get a embed code that looks like 

```html
<script src="https://kit.fontawesome.com/a57e85d9c9.js" crossorigin="anonymous"></script>
```

and can be placed ```<head></head>``` tags of your ```index.html``` file


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
          pickerWidth={280} // default = 0
          zIndex={10} // default = 1 
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

# Props that can be passed

1. **onOk** (function)
* You'll need to pass the prop ```onOk``` which is a function that takes the selected date/time as its argument. After recieveing the date/time in this function you can do whatever you please. By default, if ```onOk``` is not passed, the component will ```console.log()``` the selected date 

2. **zIndex** (number)
* You can change the z-index of the picker component according to your project needs by passin the prop ```zIndex```. Default value = 1

3. **pickerWidth** (number)
* This is used to set the width of the picker by passing the prop ```pickerWidth```. The dates in the calendar are rendered according to this width. Default value = 250

# Date Time Format

Currently, the date is returned in the format ```"MM/DD/YYYY"``` ie ```"12/31/2019"``` 
and the time is returned in the format ```"hh:mm a"``` ie ```"04:20 pm"``` 

Both of them are returned as Strings.

To create a Date object out of a string, you can do the following : 

```js
var x = "12/31/2019"
var date = Date.parse(x) // returns milliseconds since January 1, 1970, 00:00:00 UTC
date = new Date(date) // creates JavaScript Date Object

```


# Ongoing Work

1. Removal of Moment.js dependency
2. Provision for styling





