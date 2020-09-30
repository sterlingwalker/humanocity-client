import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import { Route } from 'react-router'
import { withRouter, useHistory } from 'react-router-dom'

function App() {
const [tab, setTab] = useState('/')
let history = useHistory()

useEffect(() =>
  {
    setTab(history.location.pathname)
  },[history.location])

  return (
    <div>
      <NavigationBar currentTab={tab} />
      <React.Fragment>
        <Route path='/' exact component={HomePage} />
        <Route path='/all/users' component={EmployeeTable} />
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);