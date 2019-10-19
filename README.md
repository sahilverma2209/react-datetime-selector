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

```
import DateOrTimeSelector from '../../node_modules/react-datetime-selector/dist/index'
```

## Example and further explanation:

```js
import DateOrTimeSelector from '../../node_modules/react-datetime-selector/dist/index'

class App extends React.Component {
  constructor(){
    super()
    
    this.state = {
      selectedDate='',
      selectedTime=''
    }
  }
  
  render(){
    return(
      <div>
      
        <DateOrTimePicker
          onOk={selectedDate => this.setState({ selectedDate })}
        />
        
        <DateOrTimePicker
          timePicker={true}
          onOk={selectedTime => this.setState({ selectedTime })}
        />
        
      </div>
    )
  }
}

```






