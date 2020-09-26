import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <NavigationBar />
      <React.Fragment>
        <Route path='/' exact component={HomePage} />
        <Route path='/all/users' component={EmployeeTable} />
      </React.Fragment>
    </div>
  );
}

export default withRouter(App);