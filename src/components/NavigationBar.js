import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Tab, Tabs } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import EventNote from '@material-ui/icons/Event'
import AlarmIcon from '@material-ui/icons/Alarm'
import GroupIcon from '@material-ui/icons/Group'
import CommentIcon from '@material-ui/icons/Comment'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    tab: {
      color: 'white'
    },
    appbar: {
      backgroundColor: '#6C6FA5'
    }
  });

const NavigationBar = (props) => {
    const classes = useStyles()
    let history = useHistory();


    const handleChange = (event, newValue) => {
        history.push(newValue)
      };

    return (
    <AppBar className={classes.appbar} position='absolute'>
      <Toolbar >
          <h3>HUMANOCITY</h3>
        <Tabs
        variant="scrollable"
        value={props.currentTab}
        onChange={handleChange}
    >
        <Tab className={classes.tab} icon={<HomeIcon />} value='/' tabIndex={0} />
        <Tab className={classes.tab} icon={<AlarmIcon />} value='' tabIndex={1}/>
        <Tab className={classes.tab} icon={<GroupIcon />} value='/all/users' tabIndex={2}/>
        <Tab className={classes.tab} icon={<EventNote />} value='' tabIndex={3}/>
        <Tab className={classes.tab} icon={<CommentIcon />} value='' tabIndex={4}/>
        </Tabs>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar