import { employees } from './demo';
const apiPath = '/hr-server/api/v1/';

const isDemo = false; //Change to true for demo data

export const getAllEmployees = async () => {
    if(isDemo) {
        return employees
    }
    try {
        const response = await fetch(apiPath + 'employees', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}

export const getSingleEmployee = async (id) => {
    if(isDemo) {
        return employees.find(employee => employee.id === id)
    }
    try {
        const response = await fetch(apiPath + 'employee/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        return err;
    }
}

export const postNewEmployee = async (employee) => {
    try {
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
        return 'Error trying to add new employee'
    } catch (err) {
        return err;
    }
}

export const patchSingleEmployee = async (employee) => {
    try {
        const response = await fetch(apiPath + 'update/employee', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        console.log(response)
        if (response.status === 200){
            return 'Employee Updated Successfully'
        }
        return 'Error trying to update employee'
    } catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}

export const getEmployeeSchedule = async () => {
    try {
        const response = await fetch(apiPath + 'employeeSchedule', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}

export const postEmployeeSchedule = async () => {
    try {
        const response = await fetch(apiPath + 'employeeSchedule', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        return await response.json();
    } catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}

export const getEmployeeTimeOffs = async () => {
    try {
        const response = await fetch(apiPath + 'employeeSchedule', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        return await response.json();
    } catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}

export const postEmployeeTimeOffs = async () => {
    try {
        const response = await fetch(apiPath + 'employeeSchedule', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        return await response.json();
    }  catch (err) {
        return err;
    } finally {fetch('/404page').then(function(response) {
        if (response.status !== 200) {
          return response.json()
        }
      }).then(function(object) {
        console.log(object.type, object.message)
      })
    }
}