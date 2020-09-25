import React, { useState }from 'react';
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Tab, Tabs } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import EventNote from '@material-ui/icons/Event'
import PersonPinIcon from '@material-ui/icons/PersonPin'

const useStyles = makeStyles({
    tab: {
      color: 'white'
    },
    appbar: {
      backgroundColor: '#6C6FA5'
    }
  });

const NavigationBar = (props) => {
    const [value, setValue] = useState(0)
    const classes = useStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
    <AppBar className={classes.appbar} position='absolute'>
      <Toolbar >
          <h3>HUMANOCITY</h3>
        <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
    >
        <Tab className={classes.tab} icon={<HomeIcon />} tabIndex={0} />
        <Tab className={classes.tab} icon={<EventNote />} tabIndex={1}/>
        <Tab className={classes.tab} icon={<PersonPinIcon />} />
        </Tabs>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar