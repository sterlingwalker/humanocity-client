import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const choices = [
  {
    value: 'complaint',
    label: 'Complaint',
  },
  {
    value: 'suggestion',
    label: 'Suggestion',
  },
  {
    value: 'request',
    label: 'Request',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FeedbackPage() {
  const classes = useStyles();
  const [choice, setChoice] = React.useState('complaint');

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-choices"
          select
          label="Select"
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
        <form className={classes.root} noValidate autoComplete="off">
          <div>        
            <TextField
              id="outlined-textarea"
              placeholder="Enter text here"
              multiline
              variant="outlined"
            />
            <Button size="large" color="primary" onClick={()=> window.open("")}>
                Send
              </Button>
          </div>
        </form>
      </div>
    </form>
  );
}
