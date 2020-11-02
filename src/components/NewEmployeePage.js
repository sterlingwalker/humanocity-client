import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Typography } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Avatar from '@material-ui/core/Avatar'
import { postNewEmployee } from '../api'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router'


const useStyles = makeStyles((theme) => ({
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    container: {
      textAlign: 'center'
    },
    formGroup: {
      marginTop: '1em'
    },
    radio: {
      display: 'flex',
      flexDirection: 'row'
    },
    formgroup: {
        marginLeft: 15
    },
    avatar: {
        height: '8em',
        width: '8em',
    },
    headings: {
        fontSize: '1.5rem'
    },
    button: {
        marginTop: 15
    },
    avatarCont: {
        display: 'flex',
        justifyContent: 'center'
    }
  }))


const NewEmployeePage = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    let history = useHistory()
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    }

    const handleSubmit = event => {
        let data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            position: document.getElementById('position').value,
            salary: document.getElementById('salary').value,
            dept: document.getElementById('dept').value,
            email: document.getElementById('email').value,
            managerID: document.getElementById('managerId').value,
            address: {
                street: document.getElementById('street').value + 
                document.getElementById('street2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipcode: document.getElementById('zipcode').value
            }
        }

        postNewEmployee(data).then(response => {
            setMessage(response)
            setOpen(true)
            if(response.includes('Added')){
                setTimeout(() =>  history.push('/employees'), 6000)
            }
        })

    }

    return (
        <div>
           <div className={classes.avatarCont}>
            <Avatar className={classes.avatar} src="/broken-image.jpg" />
           </div>
        <div className={classes.container}>
        <Button color='primary' className={classes.button} variant='outlined' >Upload</Button>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
              <Typography className={classes.headings}>New Hire Details</Typography>
            <div className={classes.formGroup}>
              <div className={classes.form}>
                <TextField id="firstName" label="First Name" variant="outlined" />
                <TextField id="lastName" label="Last Name" variant="outlined" />
                <TextField id="email" label="Email" variant="outlined" />
                <TextField id="salary" label="Salary" variant="outlined" />
                <TextField id="position" label="Position" variant="outlined" />
                <TextField id="managerId" label="ManagerID" variant="outlined" />
                <TextField id="dept" label="Department" variant="outlined" />
                <FormControl className={classes.formgroup} component="fieldset">
                <FormLabel component="legend">Availability</FormLabel>
                <RadioGroup className={classes.radio} name="position" defaultValue="default">
                    <FormControlLabel value="default" control={<Radio color="primary" />} label="Default" />
                    <FormControlLabel value="end" control={<Radio color="primary" />} label="Custom" />
                </RadioGroup>
                </FormControl>
              </div>
            </div>
          </Grid>
          <Grid item xs>
              <Typography className={classes.headings}>Contact Information</Typography>
            <div className={classes.formGroup}>
              <div className={classes.form}>
                <TextField id="street" label="Street Address 1" variant="outlined" />
                <TextField id="street2" label="Street Address 2" variant="outlined" />
                <TextField id="city" label="City" variant="outlined" />
                <TextField id="state" label="State" variant="outlined" />
                <TextField id="zipcode" label="ZIP Code" variant="outlined" />
                <TextField id="phone" label="Phone Number" variant="outlined" />
                <TextField id="emcName" label="Emergency Contact Name"variant="outlined"/>
                <TextField id="emcNumber" label="Emergency Contact Number"variant="outlined"/>
              </div>
            </div>
          </Grid>
        </Grid>
        <Button color='primary' className={classes.button} onClick={handleSubmit} variant='contained' >Submit</Button>
        </div>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
        </div>
      )
      
}

export default NewEmployeePage