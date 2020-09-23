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
   <div>
    <MaterialTable
      icons={tableIcons}
      title="All Employees"
      columns={[
        { title: 'First Name', field: 'firstname' },
        { title: 'Last Name', field: 'lastname' },
        { title: 'Employee ID', field: 'id'},
        {
          title: 'Department',
          field: 'dept',
          lookup: { 34: 'Finance', 63: 'Engineering', 12: 'Legal', 44: 'Operations' },
        },
      ]}
      data={[
        { firstname: 'John', lastname: 'Baran', id: 84589208423, dept: 63 },
        { firstname: 'Zara', lastname: 'Pennington', id: 42987349892, dept: 34 },
        { firstname: 'Eric', lastname: 'Owens', id: 59204824805, dept: 44 },
        { firstname: 'Ashley', lastname: 'Opec', id: 47890234956, dept: 12 },
        { firstname: 'Kyle', lastname: 'Richmond', id: 97424379053, dept: 34 },
      ]}
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