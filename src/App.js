import React, { useState, useEffect } from 'react';
import EmployeeTable from './components/EmployeeTable'
import ProfilePage from './components/ProfilePage'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import SchedulePage from './components/SchedulePage'
import FeedbackPage from './components/FeedbackPage'
import FeedbackList from './components/FeedbackList'
import TimeOffPage from './components/TimeOffPage'
import { Route, Switch } from 'react-router'
import { withRouter, useHistory } from 'react-router-dom'
import NewEmployeePage from './components/NewEmployeePage';
import NoMatch, { ServerError } from './components/404page';
import { Redirect } from 'react-router-dom';
import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import SubmitTimeOffPage from './components/SubmitTimeOffPage';
import EmployeeOnlyPage from './components/EmployeeOnlyPage';
import EmployeeNavBar from './components/EmployeeNavBar';

function App() {
  const [tab, setTab] = useState('/')
  const [employeeMode, setEmployeeMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  let history = useHistory()

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, [])
  useEffect(() =>
  {
    if(history.location.pathname !== '/employee'&&
        history.location.pathname !== '/newHire'){  //To keep the same tab when the profile/add employee is clicked
      setTab(history.location.pathname)
    }
  },[history.location])

  if(!employeeMode) {
  return (
    <div>
      <NavigationBar currentTab={tab} switchMode={setEmployeeMode} />
      <div style={{marginTop: 5 +'em' /* Add spacing between navbar and page contents */}} />
      <React.Fragment>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/timeoff' component={TimeOffPage} />
        <Route exact path='/employee' render={(props) => selectedEmployee !== null ? <ProfilePage {...props} currentEmployee={selectedEmployee} /> : <Redirect to='/employees'/>}  />
        <Route exact path='/employees' render={(props) => <EmployeeTable {...props} clicked={setSelectedEmployee} />} />
        <Route exact path='/schedule' component={SchedulePage} />
        <Route exact path='/feedback' component={FeedbackPage} />
        <Route exact path='/newHire' component={NewEmployeePage} />
        <Route exact path='/feedbackList' component={FeedbackList} />
        <Route exact path='/submitTimeoff' component={SubmitTimeOffPage} />
        <Route exact path='/404page' component={NoMatch} />
        <Route exact path='/error' component={ServerError} />
        <Redirect to='/404page'/>
        </Switch>
      </React.Fragment>
    </div>
  );
  }
  else {
    return (
      <React.Fragment>
      <EmployeeNavBar currentTab={tab} />
      <div style={{marginTop: 5 +'em' /* Add spacing between navbar and page contents */}} />
      <Switch>
      <Route exact path='/' component={EmployeeOnlyPage} />
      <Route exact path='/schedule' component={SchedulePage} />
      <Route exact path='/feedback' component={FeedbackPage} />
      <Route exact path='/submitTimeoff' component={SubmitTimeOffPage} />
      <Route exact path='/404page' component={NoMatch} />
      <Route exact path='/error' component={ServerError} />
      <Redirect to='/404page'/>
      </Switch>
    </React.Fragment>
    )
  }
}

export default withRouter(App);