import React, { forwardRef } from 'react'
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
  import { useHistory } from 'react-router-dom'
  import { makeStyles } from '@material-ui/core/styles'

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

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: 'none',
    marginLeft: 15,
    color: 'white',
    backgroundColor: '#1fa127',
    '&:hover': {
      backgroundColor: '#1fa127'
    }
  }
}))

const EmployeeTable = (props) => {
  let history = useHistory()
  const classes = useStyles()

const handleClick = (id) => {
    props.clicked(id)
    history.push('/employee')
}

  return (
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
          icon: 'view/manage',
          tooltip: 'View or manage profile',
          onClick: (event, rowData) => handleClick(rowData.ID)
        },
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => alert("Feature coming soon")
        }
      ]}
      components={{
        Action: props => {
          if(props.action.icon === 'view/manage') {
            return (
          <Button
            onClick={(event) => props.action.onClick(event, props.data)}
            color="primary"
            variant="contained"
            style={{textTransform: 'none'}}
            size="small"
          >
            View/Manage Profile
          </Button>
          )
        } else {
          return (
            <Button
            onClick={(event) => props.action.onClick(event, props.data)}
            variant="contained"
            className={classes.btn}
            size="small"
          >
            Add Employee
          </Button>
          )
        }
        }
      }}
      options={{
        actionsColumnIndex: -1
      }}
    />
  )
}

export default EmployeeTable