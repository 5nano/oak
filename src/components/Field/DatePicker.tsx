import * as React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface IDatePickerProps{
    context:any,
    id:any
}
const DatePicker:React.SFC<IDatePickerProps> = (props) => {

    const [date,setDate] = React.useState<Date | null> (new Date())
    const {context,id} = props
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      value={date}
                      onChange={
                        (date:Date) =>{
                          context.setValues({ [id]: date })
                          setDate(date) }
                      }
                      disablePast
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;