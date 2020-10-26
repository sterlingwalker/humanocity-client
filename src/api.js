const apiPath = '/hr-server/api/v1/';

export const getAllEmployees = async () => {
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
    } catch (err) {
        return err;
    }
}