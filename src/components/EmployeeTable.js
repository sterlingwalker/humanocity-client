import React, { Component, forwardRef } from 'react'
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
  import { employees } from '../demo'

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

class EmployeeTable extends Component {

    render() {
        return (
   <div style={{marginTop: '70px'}}>
    <MaterialTable
      icons={tableIcons}
      title="All Employees"
      columns={[
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Employee ID', field: 'ID'},
        {
          title: 'Department',
          field: 'dept',
        },
      ]}
      data={employees}
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("Coming soon ;) " + rowData.name)
        }
      ]}
      components={{
        Action: props => (
          <Button
            onClick={(event) => props.action.onClick(event, props.data)}
            color="primary"
            variant="contained"
            style={{textTransform: 'none'}}
            size="small"
          >
            View/Manage Profile
          </Button>
        ),
      }}
      options={{
        actionsColumnIndex: -1
      }}
    />
            </div>
        )
    }
}

export default EmployeeTable