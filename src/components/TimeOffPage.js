import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import {
  Button,
  Snackbar 
} from '@material-ui/core'
import { 
  AddBox,
  Clear,
  Search,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft,
  ArrowDownward,
  Remove,
  ViewColumn
} from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import { getEmployeeTimeOffs, approveTimeOff, denyTimeOff } from '../api'
import { useHistory } from 'react-router'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

const TimeOffPage = (props) => {
  let history = useHistory();
  const [updatePrompt, setUpdatePrompt] = useState({open: false, severity: 'error', message: ''});
  const [timeoff, setTimeOff] = useState([]);
  useEffect(() => {
    refreshTimeOffs(); // eslint-disable-next-line
  }, [history])

  const refreshTimeOffs = () => {
    setTimeOff([]);
    getEmployeeTimeOffs().then(response => {
      let table = [];
      for (let index = 0; index < response.length; index++) {
        const employee = response[index];
        const startDate = new Date(employee.start).toLocaleDateString();
        const endDate = new Date(employee.end).toLocaleDateString();
        let timeOffString;

        if (startDate !== endDate) { 
          timeOffString = startDate + ' - ' +  addDays(endDate, -1).toLocaleDateString(); // -1 because time off excludes last day
        } else {
          const startTime = new Date(employee.start).toLocaleTimeString();
          const endTime = new Date(employee.end).toLocaleTimeString();
          timeOffString = startDate + ': ' + startTime + ' - ' + endTime;
        }

        let row = {
          timeOffId: employee.timeOffId,
          Name: employee.firstName + " " + employee.lastName,
          dateoff: timeOffString
        };
        table.push(row);
      }
      setTimeOff(table)
    }).catch(() => history.push('/error'))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUpdatePrompt({...updatePrompt, open: false});
  }

  const handleTimeOffPromise = (promise) => {
    promise.then(response => {
      setUpdatePrompt({open: true, severity: response.includes('success') ? 'success' : 'error', message: response });
      refreshTimeOffs();
    }).catch(err => history.push('/error'));
  }

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        localization={{
          header: {
            actions: 'Actions'
          },
        }}
        title="Employee Time Off Requests"
        columns={[
          {
            title: 'Requestor',
            field: 'Name',
            headerStyle: {
              backgroundColor: '#6C6FA5',
              color: '#ffffff'
            }
          },
          {
            title: 'Time Off Dates',
            field: 'dateoff',
            headerStyle: {
              backgroundColor: '#6C6FA5',
              color: '#ffffff'
            }
          },       
        ]}
        data={timeoff}
        isLoading={timeoff == null}
        actions={[
          {
            icon: props => (
              <Button
                color= "primary"
                variant="contained"
                style={{backgroundColor: 'red'}}
                size="small"
              >
                Deny
              </Button>),
            tooltip: 'Deny Request',
            onClick: (event, rowData) => {
              handleTimeOffPromise(denyTimeOff(rowData.timeOffId));
            }
          },
          {
            icon: props => (
              <Button
                color="secondary"
                variant="contained"
                style={{backgroundColor: 'green'}}
                size="small"
              >
                Approve
              </Button>),
            tooltip: 'Approve Request',
            onClick: (event, rowData) => {
              handleTimeOffPromise(approveTimeOff(rowData.timeOffId));
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#6C6FA5',
            color: '#ffffff',
            fontSize: '1.1em'
          },
          pageSize: 20
        }}
      />
      <Snackbar open={updatePrompt.open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={updatePrompt.severity}>
            {updatePrompt.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default TimeOffPage