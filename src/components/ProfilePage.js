import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router';
import { patchSingleEmployee, terminateEmployee } from '../api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import firebase from "firebase/app";
import 'firebase/storage';


const cardWidth = 300;
const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  card: {
    maxWidth: cardWidth,
  },
  media: {
    height: cardWidth,
    width: cardWidth
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '.75em'
  },
  formGroup: {
    marginLeft: '1.5em',
    marginTop: '1em'
  },
  buttons: {
    marginRight: 15
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})


export default function ProfilePage({currentEmployee}) {
  const classes = useStyles()
  let history = useHistory()
  const [open, setOpen] = useState(false)
  const [updatePrompt, setUpdatePrompt] = useState({open: false, severity: 'error', message: ''})
  const [image, setImage] = useState(null)

  useEffect(() => {
    firebase.storage().ref().child('/'+ currentEmployee.id+'.jpg')
    .getDownloadURL().then(url => setImage(url));
  }, [currentEmployee.id])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUpdatePrompt({...updatePrompt, open: false});
  }

  const updateEmployee = event => {
    let data = {
      id: document.getElementById('id').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      position: document.getElementById('position').value,
      salary: document.getElementById('salary').value.replace(',','').replace('$','').replace('.00',''),
      dept: document.getElementById('dept').value,
      email: document.getElementById('email').value,
      managerID: document.getElementById('managerId').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      emergencyName: document.getElementById('emergencyName').value,
      emergencyNumber: document.getElementById('emergencyNumber').value,
      address: {
          street: document.getElementById('street').value + 
          document.getElementById('street2').value,
          city: document.getElementById('city').value,
          state: document.getElementById('state').value,
          zipcode: document.getElementById('zipcode').value
      }
    }
    patchSingleEmployee(data).then(response => {
      if(response.includes('Error')){
        setUpdatePrompt({open: true, severity: 'error', message: response })
      } else {
        setUpdatePrompt({open: true, severity: 'success', message: response})
      }
    }).catch(() => history.push('/error'))
  }

  const removeEmployee = event => {
    terminateEmployee(currentEmployee.id).then(response => {
      if(response.includes('Error')){
        setUpdatePrompt({open: true, severity: 'error', message: response })
      } else {
        setUpdatePrompt({open: true, severity: 'success', message: response})
        setOpen(false)
        if(response.includes('Success')){
          setTimeout(() =>  history.push('/employees'), 2000)
      }
      }
    }).catch(() => history.push('/error'))
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const TerminateDialog = props => {
    return (
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
        >
          <DialogTitle >{'Terminate Employee: ' + props.first + ' ' + props.last}</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Are you sure you would like to delete this employee? All of their data will 
              be erased from the database PERMANENTLY!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={removeEmployee} color="secondary">
              TERMINATE
            </Button>
          </DialogActions>
        </Dialog>
    )
  }

    return (
      <div className={classes.container}>
        <div>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={image} title={currentEmployee.firstName + "'s Picture"} />
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
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=> window.open("mailto:" + currentEmployee.email, "_blank")}>
                Send Email
              </Button>
              <Button size="small" color="primary" onClick={()=> navigator.clipboard.writeText(currentEmployee.email) /* TODO: Show toast or s/t... */}> 
                Copy Email Address
              </Button>
            </CardActions>
          </Card>
          </div>
          <div className={classes.formGroup}>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField id="street" label="Street Address 1" variant="outlined" defaultValue={currentEmployee.address.street} required/>
              <TextField id="street2" label="Street Address 2" variant="outlined"/>
              <TextField id="city" label="City" variant="outlined" defaultValue={currentEmployee.address.city} required/>
              <TextField id="state" label="State" variant="outlined" defaultValue={currentEmployee.address.state} required />
              <TextField id="zipcode" label="ZIP Code" variant="outlined" defaultValue={currentEmployee.address.zipcode} required />
              <TextField id="phoneNumber" label="Phone Number" variant="outlined" defaultValue={currentEmployee.phoneNumber} required />
              <TextField id="emergencyName" label="Emergency Contact Name" variant="outlined" defaultValue={currentEmployee.emergencyName} required />
              <TextField id="emergencyNumber" label="Emergency Contact Number" variant="outlined" defaultValue={currentEmployee.emergencyNumber} required />

              <TextField id="id" label="ID" variant="outlined" defaultValue={currentEmployee.id} required />
              <TextField id="firstName" label="First Name" variant="outlined" defaultValue={currentEmployee.firstName} required />
              <TextField id="lastName" label="Last Name" variant="outlined" defaultValue={currentEmployee.lastName} required />
              <TextField id="email" label="Email" variant="outlined" defaultValue={currentEmployee.email} required />
              <TextField id="salary" label="Salary" variant="outlined" defaultValue={formatter.format(currentEmployee.salary)} required />
              <TextField id="position" label="Position" variant="outlined" defaultValue={currentEmployee.position} required />
              <TextField id="managerId" label="ManagerID" variant="outlined" defaultValue={currentEmployee.managerID} required />
              <TextField id="dept" label="Department" variant="outlined" defaultValue={currentEmployee.dept} required />
            </div>
            <Button variant="contained" color="primary" className={classes.buttons} onClick={updateEmployee}>
                Save
            </Button>
            <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=> setOpen(true)}>
                Terminate
            </Button>
            <TerminateDialog first={currentEmployee.firstName} last={currentEmployee.lastName} />
          </form>
        </div>
        <Snackbar open={updatePrompt.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={updatePrompt.severity}>
            {updatePrompt.message}
          </Alert>
        </Snackbar>
      </div>
  ) 
}