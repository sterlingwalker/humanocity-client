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
import { Card,
   TextField,
   Button,
   CardActions,
   CardContent,
   CardHeader,
   Typography,
   CardMedia,
   LinearProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { getSingleEmployee, getSingleEmployeeTime, requestTimeOff } from '../api';
import { useHistory } from 'react-router';
import firebase from "firebase/app";
import 'firebase/storage';

const useStyles = makeStyles((theme) => ({
  container: {
      display: 'flex',
      flexDirection: 'row'
  },
  card: {
      margin: 20,
      maxWidth: 350,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
  },
  media: {
      height: 300,
    },
    root: {
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    toDetails: {
      marginTop: 20
    }
}));

export default function SubmitTimeOffPage() {
  let history = useHistory();
  const [id, setId] = useState(null);
  const [updatePrompt, setUpdatePrompt] = useState({open: false, severity: 'error', message: ''});
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [fullDays, setFullDays] = useState(false);
  const [image, setImage] = useState('https://www.pngkey.com/png/detail/349-3499617_person-placeholder-person-placeholder.png');
  const [currentEmployee, setCurrentEmployee] = useState({firstName: 'N/A', lastName: 'N/A', email: 'N/A', position: 'N/A', hoursRemaining: 0, totalHours: 0});

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUpdatePrompt({...updatePrompt, open: false});
  }

  const handleStartDateChange = (date) => {
    setFullDays(new Date(date).toDateString() !== selectedDateEnd.toDateString());
    setSelectedDateStart(date);
  };

  const handleEndDateChange = (date) => {
    setFullDays(new Date(date).toDateString() !== selectedDateStart.toDateString());
    setSelectedDateEnd(date);
  };

  const handleChange = event => {
    setId(event.target.value)
  }

  const handleSearch = event => {
    getSingleEmployee(id).then(response => {
      let employee = response;
      firebase.storage().ref().child('/'+ id+'.jpg')
      .getDownloadURL().then(url => setImage(url));
      getSingleEmployeeTime(id).then(data => setCurrentEmployee({...employee, hoursRemaining: data.hoursRemaining, totalHours: data.totalHours}))
    }).catch(err => history.push('/error'))
  }

  const handleSubmit = event => {
    let data = {
      employeeId: id,
      start: toServerString(selectedDateStart),
      end: toServerString(selectedDateEnd)
    }
    if (fullDays) {
      data.start = data.start.substring(0, 11) + '00:00:00';
      data.end = data.end.substring(0, 11) + '00:00:00';
    }
    console.log(data);
    requestTimeOff(data).then(response => {
      if(response.includes('Invalid')){
        setUpdatePrompt({open: true, severity: 'error', message: response })
      } else {
        setUpdatePrompt({open: true, severity: 'success', message: response})
      }
    }).catch(err => history.push('/error'))
  }

  const toServerString = (date) => {
        let day = digitFormatter(date.getDate());
        let month = digitFormatter(date.getMonth() + 1);
        let year = date.getFullYear();
        let yyyy_MM_dd = [year,month,day].join('-'); 
        let hour = digitFormatter(date.getHours());
        let mins = digitFormatter(date.getMinutes());
        let secs = '00';
        let time = [hour,mins,secs].join(':');
        return `${yyyy_MM_dd}T${time}`;
  }

  const digitFormatter = (num) => {
    return `${num}`.length < 2 ? `0${num}` : num;
  }

  return (
    <div className={classes.container}>
    <Card className={classes.card}>
       <CardMedia className={classes.media} image={image} title="'s Picture" />
       <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
             {currentEmployee.firstName + " " + currentEmployee.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
             {currentEmployee.position}
          </Typography>
          <Typography variant="body2" component="p">
             {currentEmployee.email}
          </Typography>
       </CardContent>
       <CardActions>
          <TextField id="id" onChange={handleChange} label="Enter Employee ID" variant="outlined" required/>
          <Button variant="contained" onClick={handleSearch} color="primary">Search</Button>
       </CardActions>
    </Card>
    <div className={classes.toDetails}>
       <Grid container direction="column" wrap='wrap'>
          <Card className={classes.root}>
             <div className={classes.details}>
                <CardContent className={classes.content}>
                   <Typography component="h5" variant="h5">
                      Hours Remaining: {currentEmployee.hoursRemaining}
                   </Typography>
                   <Typography variant="subtitle1" color="textSecondary">
                      Total Hours: {currentEmployee.totalHours}
                   </Typography>
                </CardContent>
             </div>
             <CardContent>
                <LinearProgress  variant="determinate" value={(currentEmployee.hoursRemaining/currentEmployee.totalHours)*100} color='primary' />
             </CardContent>
          </Card>
          <Grid container direction="row" wrap='wrap' spacing={2} >
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
                         value={selectedDateStart}
                         minDate={new Date()}
                         onChange={handleStartDateChange}
                         KeyboardButtonProps={{
                         'aria-label': 'change date',
                         }}
                         />
                         <KeyboardTimePicker
                         margin="normal"
                         id="time-picker"
                         label="Time picker"
                         value={fullDays ? new Date(selectedDateStart.toLocaleDateString() + " 12:00 AM") : selectedDateStart}
                         onChange={handleStartDateChange}
                         disabled={fullDays}
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
                         value={selectedDateEnd}
                         minDate={selectedDateStart}
                         onChange={handleEndDateChange}
                         KeyboardButtonProps={{
                         'aria-label': 'change date',
                         }}
                         />
                         <KeyboardTimePicker
                         margin="normal"
                         id="time-picker"
                         label="Time picker"
                         value={fullDays ? new Date(selectedDateEnd.toLocaleDateString() + " 11:59 PM")  : selectedDateEnd}
                         onChange={handleEndDateChange}
                         disabled={fullDays}
                         KeyboardButtonProps={{
                         'aria-label': 'change time',
                         }}
                         />
                      </Grid>
                   </MuiPickersUtilsProvider>
                </CardActions>
             </Card>
          </Grid>
          <Button color='primary' onClick={handleSubmit} variant='outlined'>Submit</Button>
       </Grid>
    </div>
    <Snackbar open={updatePrompt.open} onClose={handleClose}>
       <Alert onClose={handleClose} severity={updatePrompt.severity}>
          {updatePrompt.message}
       </Alert>
    </Snackbar>
 </div>
  );
}