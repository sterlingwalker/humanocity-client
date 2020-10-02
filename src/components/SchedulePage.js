import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
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

const useStyles = makeStyles({
  
});

export default function SchedulePage() {
  const classes = useStyles();
  let history = useHistory();
  let employeeSchedule = [ // TEMPORARY
      {
        Employee: "First Last",
        Monday: "9 AM - 5 PM",
        Tuesday: "OFF",
        Wednesday: "9 AM - 5 PM",
        Thursday: "OFF",
        Friday: "9 AM - 5 PM",
        Saturday: "OFF",
        Sunday: "OFF",
      },
      {
        Employee: "First2 Last2",
        Monday: "OFF",
        Tuesday: "9 AM - 5 PM",
        Wednesday: "OFF",
        Thursday: "9 AM - 5 PM",
        Friday: "OFF",
        Saturday: "OFF",
        Sunday: "OFF",
      },
    ];

  return (
    <MaterialTable
      icons={tableIcons}
      title="Employee Schedule"
      columns={[
        { title: 'Employee', field: 'Employee' },
        { title: 'Monday', field: 'Monday'},
        { title: 'Tuesday', field: 'Tuesday'},
        { title: 'Wednesday', field: 'Wednesday'},
        { title: 'Thursday', field: 'Thursday'},
        { title: 'Friday', field: 'Friday'},
        { title: 'Saturday', field: 'Saturday'},
        { title: 'Sunday', field: 'Sunday'}
      ]}
      data={employeeSchedule}
    />
  );
}