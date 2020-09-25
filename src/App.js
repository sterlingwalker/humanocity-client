import React from 'react';
import { makeStyles } from '@material-ui/styles'
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import HomeCard from './components/HomeCard'
import NavigationBar from './components/NavigationBar'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: 'auto', 
    gridGap: '1rem',
    marginTop: '80px'
  }
});

function App() {
  const classes = useStyles()

  const cards = (
    <div className={classes.cards}>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/person.svg'} title="Personal Time Off" description="Employees' requested time off" />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/people.svg'} title="User Management" description="Add, remove, and manage employees" url={'/all/users'} />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/schedule.svg'} title="Schedule" description="Weekly employee schedule" />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/feedback.svg'} title="Feedback" description="Employee complaints and feedback" />
    </div>
  )
  return (
    <div>
    <NavigationBar />
    <React.Fragment>
      <Route path='/' exact render={() => cards} />
      <Route path='/all/users' component={EmployeeTable} />
    </React.Fragment>
    </div>
  );
}

export default withRouter(App);
