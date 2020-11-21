import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { submitFeedback } from '../api';
import { useHistory } from 'react-router-dom';

const choices = [
  {
    value: 'Complaint',
    label: 'Complaint',
  },
  {
    value: 'Suggestion',
    label: 'Suggestion',
  },
  {
    value: 'Request',
    label: 'Request',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '60%',
      marginLeft: 20
    },
  },
    input: {
    display: 'flex',
    flexDirection: 'row'
  }, 
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%'
  }
}));

export default function FeedbackPage() {
  let history = useHistory();
  const classes = useStyles();
  const [choice, setChoice] = useState('Complaint');
  const [errorField, setErrorField] = useState(false);
  const [text, setText] = useState('');
  const [id, setId] = useState(null)
  const [updatePrompt, setUpdatePrompt] = useState({open: false, severity: 'error', message: ''});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUpdatePrompt({...updatePrompt, open: false});
  }

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const handleText = (event) => {
    setText(event.target.value);
    if (id === null) {
      setErrorField(true);
    }
  };

  const handleId = (event) => {
    setErrorField(false);
    setId(event.target.value);
  }

  const handleSend = (event) => {
    const feedback = {
      employeeId: id,
      type: choice,
      description: text
    }
    submitFeedback(feedback).then(response => {
      if(response.includes('Thanks')){
        setUpdatePrompt({open: true, severity: 'success', message: response})
      } else {
        setUpdatePrompt({open: true, severity: 'error', message: response})
      }
    }).catch(err => history.push('/error'));
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <div className={classes.options}>
        <TextField
          id="standard-select-choices"
          select
          label="Feedback Category"
          value={choice}
          onChange={handleChange}
          helperText="Please select an option"
        >
          {choices.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="id" error={errorField} onChange={handleId} label="Enter Employee ID" variant="outlined" required/>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.input} >        
            <TextField
              onChange={handleText}
              id="outlined-textarea"
              placeholder="Enter text here"
              multiline
              rows={4}
              variant="outlined"
            />
            <Button size="large" color="primary" onClick={handleSend}>
                Send
            </Button>
          </div>
        </form>
    <Snackbar open={updatePrompt.open} onClose={handleClose}>
       <Alert onClose={handleClose} severity={updatePrompt.severity}>
          {updatePrompt.message}
       </Alert>
    </Snackbar>
      </div>
    </form>
  );
}
