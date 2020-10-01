import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  }
}));

export default function ProfilePage(props) {
  const classes = useStyles();
  let history = useHistory()
  let currentEmployee = employees.find(employee => employee.ID === props.id);

  props = {// TEMPORARY
    firstName: "First",
    lastName: "Last",
    title: "Title",
    email: "employee.email@example.com",
    streetAddress1: "line1",
    streetAddress2: "line2",
    city: "city",
    state: "state",
    zip: "123456",
    phone: "987654321",
    emContactName: "name",
    emContactPhone: "123456789"
  }
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
          <Button size="small" color="primary" onClick={()=> window.open("mailto:" + props.title, "_blank")}>
            Send Email
          </Button>
          <Button size="small" color="primary" onClick={()=> navigator.clipboard.writeText(props.email) /* TODO: Show toast or s/t... */}> 
            Copy Email Address
          </Button>
        </CardActions>
      </Card>
      </div>
      <div className={classes.formGroup}>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField id="todo?" label="Street Address 1" variant="outlined" defaultValue={currentEmployee.Address.Street} required/>
          <TextField id="todo?" label="Street Address 2" variant="outlined" defaultValue={props.streetAddress2} />
          <TextField id="todo?" label="City" variant="outlined" defaultValue={currentEmployee.Address.City} required/>
          <TextField id="todo?" label="State" variant="outlined" defaultValue={currentEmployee.Address.State} required />
          <TextField id="todo?" label="ZIP Code" variant="outlined" defaultValue={currentEmployee.Address.Zipcode} required />
          <TextField id="todo?" label="Phone Number" variant="outlined" defaultValue={props.phone} required />
          <TextField id="todo?" label="Emergency Contact Name" variant="outlined" defaultValue={props.emContactName} />
          <TextField id="todo?" label="Emergency Contact Number" variant="outlined" defaultValue={props.emContactPhone} />
        </div>
        <Button variant="contained" color="primary" onClick={()=> alert("TODO!")}>
            Save
        </Button>
      </form>
      </div>
    </div>
  ) } else {
    history.push('/employees')
    return null
  }
}