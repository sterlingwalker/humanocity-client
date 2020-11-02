import React, { useState, useEffect } from 'react';
import EmployeeTable from './components/EmployeeTable'
import ProfilePage from './components/ProfilePage'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import FeedbackPage from './components/FeedbackPage'
import FeedbackList from './components/FeedbackList'
import TimeOffPage from './components/TimeOffPage'
import { Route } from 'react-router'
import { withRouter, useHistory } from 'react-router-dom'
import NewEmployeePage from './components/NewEmployeePage';
import NoMatch from './components/404page';
import { Redirect } from 'react-router-dom'

function App() {
  const [tab, setTab] = useState('/')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  let history = useHistory()

  useEffect(() =>
  {
    if(history.location.pathname !== '/employee'&&
        history.location.pathname !== '/newHire'){  //To keep the same tab when the profile/add employee is clicked
      setTab(history.location.pathname)
    }
  },[history.location])

  return (
    <div>
      <NavigationBar currentTab={tab} />
      <div style={{marginTop: 5 +'em' /* Add spacing between navbar and page contents */}} />
      <React.Fragment>
        <Route exact path='/' exact component={HomePage} />
        <Route exact path='/timeoff' component={TimeOffPage} />
        <Route exact path='/employee' exact render={(props) => <ProfilePage {...props} currentEmployee={selectedEmployee} />}  />
        <Route exact path='/employees' render={(props) => <EmployeeTable {...props} clicked={setSelectedEmployee} />} />
        <Route exact path='/schedule' component={SchedulePage} />
        <Route exact path='/feedback' component={FeedbackPage} />
        <Route exact path='/newHire' component={NewEmployeePage} />
        <Route exact path='/feedbackList' component={FeedbackList} />
        <Route path='/404page' component={NoMatch} />
        <Redirect to='/404page'/>
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);