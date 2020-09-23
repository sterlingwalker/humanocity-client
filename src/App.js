import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeTable from './components/EmployeeTable'
import HomeCard from './components/HomeCard'

function App() {
  return (
    <div className="App">
      
      <EmployeeTable />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/person.svg'} title="Personal Time Off" description="Employees' requested time off" />
      <br/>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/people.svg'} title="User Management" description="Add, remove, and manage employees" />
      <br/>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/schedule.svg'} title="Schedule" description="Weekly employee schedule" />
      <br/>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/feedback.svg'} title="Feedback" description="Employee complaints and feedback" />
    </div>
  );
}

export default App;
