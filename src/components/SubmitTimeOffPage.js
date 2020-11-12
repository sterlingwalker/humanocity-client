import 'date-fns';
import React , { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Card, TextField, Button, CardActions, CardContent, CardHeader, Switch } from '@material-ui/core';

export default function SubmitTimeOffPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        margin: 20,
        maxWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
  }));
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
  <div className={classes.container}>
    <Card className={classes.card}>
        <CardContent>
            <TextField id="id" label="Enter Employee ID" variant="outlined" required/>
        </CardContent>
        <CardActions>
            <Button variant="contained" color="primary">Search</Button>
            <Switch></Switch>
        </CardActions>
    </Card>
    <Card className={classes.card}>
        <CardHeader title='Time Off Start Date'/>
        <CardActions>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
                />
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
                </Grid>
            </MuiPickersUtilsProvider>
        </CardActions>
    </Card>
    <Card className={classes.card}>
        <CardHeader title='Time Off End Date'/>
        <CardActions>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
                />
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change time',
                }}
                />
                </Grid>
            </MuiPickersUtilsProvider>
        </CardActions>
    </Card>
</div>
  );
}
