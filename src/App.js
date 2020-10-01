import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import ProfilePage from './components/ProfilePage'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import { Route } from 'react-router'
import { withRouter, useHistory } from 'react-router-dom'

function App() {
const [tab, setTab] = useState('/')
const [selectedEmployee, setSelectedEmployee] = useState(null)
let history = useHistory()

useEffect(() =>
  {
    if(history.location.pathname !== '/employee'){  //To keep the same tab when the profile is clicked
      setTab(history.location.pathname)
    }
  },[history.location])

  return (
    <div>
      <NavigationBar currentTab={tab} />
      <div style={{marginTop: 5 +'em' /* Add spacing between navbar and page contents */}}></div>
      <React.Fragment>
        <Route path='/' exact component={HomePage} />
        <Route path='/employee' exact render={(props) => <ProfilePage {...props} id={selectedEmployee} />}  />
        <Route path='/employees' render={(props) => <EmployeeTable {...props} clicked={setSelectedEmployee} />} />
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);