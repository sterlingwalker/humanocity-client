import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import ProfilePage from './components/ProfilePage'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <NavigationBar />
      <div style={{marginTop: 5 +'em' /* Add spacing between navbar and page contents */}}></div>
      <React.Fragment>
        <Route path='/' exact component={HomePage} />
        <Route path='/employee' exact component={ProfilePage} />
        <Route path='/employees' component={EmployeeTable} />
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);