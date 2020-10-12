import React, { useState } from 'react';
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
import { employees } from '../demo';
import { useHistory } from 'react-router';

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


export default function ProfilePage(props) {
  const classes = useStyles()
  let history = useHistory()
  const [open, setOpen] = useState(false)

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
            <Button onClick={() => alert('Employee has been terminated')} color="secondary">
              TERMINATE
            </Button>
          </DialogActions>
        </Dialog>
    )
  }

  let currentEmployee = employees.find(employee => employee.ID === props.id)

  if(currentEmployee !== undefined) {
    return (
      <div className={classes.container}>
        <div>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image="https://via.placeholder.com/300" title={currentEmployee.firstName + "'s Picture"} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {currentEmployee.firstName + " " + currentEmployee.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {currentEmployee.Position}
                </Typography>
                <Typography variant="body2" component="p">
                  {currentEmployee.Email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=> window.open("mailto:" + currentEmployee.Email, "_blank")}>
                Send Email
              </Button>
              <Button size="small" color="primary" onClick={()=> navigator.clipboard.writeText(currentEmployee.Email) /* TODO: Show toast or s/t... */}> 
                Copy Email Address
              </Button>
            </CardActions>
          </Card>
          </div>
          <div className={classes.formGroup}>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField id="todo?" label="Street Address 1" variant="outlined" defaultValue={currentEmployee.Address.Street} required/>
              <TextField id="todo?" label="Street Address 2" variant="outlined" defaultValue={"TODO"} />
              <TextField id="todo?" label="City" variant="outlined" defaultValue={currentEmployee.Address.City} required/>
              <TextField id="todo?" label="State" variant="outlined" defaultValue={currentEmployee.Address.State} required />
              <TextField id="todo?" label="ZIP Code" variant="outlined" defaultValue={currentEmployee.Address.Zipcode} required />
              <TextField id="todo?" label="Phone Number" variant="outlined" defaultValue={currentEmployee.phoneNumber} required />
              <TextField id="todo?" label="Emergency Contact Name" variant="outlined" defaultValue={currentEmployee.emergencyName} required />
              <TextField id="todo?" label="Emergency Contact Number" variant="outlined" defaultValue={currentEmployee.emergencyNumber} required />

              <TextField id="todo?" label="ID" variant="outlined" defaultValue={currentEmployee.ID} required />
              <TextField id="todo?" label="First Name" variant="outlined" defaultValue={currentEmployee.firstName} required />
              <TextField id="todo?" label="Last Name" variant="outlined" defaultValue={currentEmployee.lastName} required />
              <TextField id="todo?" label="Email" variant="outlined" defaultValue={currentEmployee.Email} required />
              <TextField id="todo?" label="Salary" variant="outlined" defaultValue={currentEmployee.Salary} required />
              <TextField id="todo?" label="Position" variant="outlined" defaultValue={currentEmployee.Position} required />
              <TextField id="todo?" label="ManagerID" variant="outlined" defaultValue={currentEmployee.managerID} required />
              <TextField id="todo?" label="Department" variant="outlined" defaultValue={currentEmployee.dept} required />
            </div>
            <Button variant="contained" color="primary" className={classes.buttons} onClick={()=> alert("TODO!")}>
                Save
            </Button>
            <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=> setOpen(true)}>
                Terminate
            </Button>
            <TerminateDialog first={currentEmployee.firstName} last={currentEmployee.lastName} />
          </form>
        </div>
      </div>
  ) } else {
    history.push('/employees')
    return null
  }
}