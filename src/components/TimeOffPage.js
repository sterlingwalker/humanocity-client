import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { Button } from '@material-ui/core'
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
  ViewColumn} from '@material-ui/icons'
import { timeoff } from '../off'
import { getEmployeeTimeOffs } from '../api'

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

const TimeOffPage = (props) => {
  const [timeoff, setTimeOff] = useState([])
  useEffect(() => {
    getEmployeeTimeOffs().then(response => {
      let table = [];
      for (let index = 0; index < response.length; index++) {
        const employee = response[index];
        const start = (new Date(employee.start)).toLocaleDateString();
        const end = (new Date(employee.end)).toLocaleDateString();
        let row = {
          Name: employee.firstName + " " + employee.lastName,
          dateoff: start + ' - ' + end
        };
        table.push(row);
      }
      setTimeOff(table)
    }).catch(() => history.push('/error')) /*push the error page here, reference the other components*/
  }, [history])

  const handleClick = (id) => {}

  return (
    <MaterialTable
      icons={tableIcons}
      localization={{
        header: {
          actions: 'Actions'
        },
      }}
      title="All Employees"
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
          onClick: (event, rowData) => handleClick(rowData.ID)
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
          onClick: (event, rowData) => handleClick(rowData.ID)
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: '#6C6FA5',
          color: '#ffffff'
      }}}
    />
  )
}

export default TimeOffPage