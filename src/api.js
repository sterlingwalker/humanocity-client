import { employees } from './demo';
const apiPath = '/hr-server/api/v1/';

const isDemo = false; //Change to true for demo data

export const getAllEmployees = async () => {
    if(isDemo) {
        return employees
    }
        const response = await fetch(apiPath + 'employees', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        if (response.status === 500) {
          throw new Error('500')
        }
        return await response.json();
}

export const getSingleEmployee = async (id) => {
    if(isDemo) {
        return employees.find(employee => employee.id === id)
    }
        const response = await fetch(apiPath + 'employee/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        if (response.status === 500) {
          throw new Error('500')
        }
        return await response.json();
}

export const postNewEmployee = async (employee) => {

        const response = await fetch(apiPath + 'new/employee', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        if (response.status === 201){
            return 'Employee Added Successfully'
        }
        if (response.status === 500) {
          throw new Error('500')
        }
        return 'Error trying to add new employee'
}

export const patchSingleEmployee = async (employee) => {

        const response = await fetch(apiPath + 'update/employee', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        if (response.status === 200){
            return 'Employee Updated Successfully'
        }
        if (response.status === 500) {
          throw new Error('500')
        }
        return 'Error trying to update employee'
}

export const terminateEmployee = async (id) => {

    const response = await fetch(apiPath + 'update/terminate/' + id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (response.status === 200){
        return 'Employee Terminated Successfully'
    }
    if (response.status === 500) {
      throw new Error('500')
    }
    return 'Error trying to terminate employee'
}

function formatDate(date) { // Formats a date as yyyy-mm-dd
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getSchedule = async (monday) => {
    
        const response = await fetch(apiPath + 'schedule?monday=' + formatDate(monday), {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        if (response.status === 500) {
          throw new Error('500')
        }
        return await response.json();
}

export const getEmployeeTimeOffs = async () => {

        const response = await fetch(apiPath + 'timeoffs', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        if (response.status === 500) {
          throw new Error('500')
        }
        return await response.json();
}

export const postEmployeeTimeOffs = async () => {
  
        const response = await fetch(apiPath + 'employeeSchedule', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        if (response.status === 500) {
          throw new Error('500')
        }
        return await response.json();
}