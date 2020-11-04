import React, { forwardRef, useEffect, useState } from 'react'
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
import { Button } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { getSchedule } from '../api'
import { useHistory } from 'react-router-dom'

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

export default function SchedulePage() {
  let history = useHistory();
  const [open, setOpen] = useState();
  const [employeeSchedule, setSchedule] = useState([]);
  useEffect(() => {
    refreshSchedule(mondayMaker(0))   // eslint-disable-next-line
  }, []);

  const refreshSchedule = (scheduleMonday) => {
    setSchedule([])
    getSchedule(scheduleMonday)
    .then(response => {
      console.log(response);
      let table = [];
      for (let index = 0; index < response.length; index++) {
        const employeeSchedule = response[index];
        console.log(employeeSchedule);
        let row = {
          Employee: employeeSchedule.firstName + " " + employeeSchedule.lastName,
          Monday: availabilityToString(employeeSchedule.availability[0]),
          Tuesday: availabilityToString(employeeSchedule.availability[1]),
          Wednesday: availabilityToString(employeeSchedule.availability[2]),
          Thursday: availabilityToString(employeeSchedule.availability[3]),
          Friday: availabilityToString(employeeSchedule.availability[4]),
          Saturday: availabilityToString(employeeSchedule.availability[5]),
          Sunday: availabilityToString(employeeSchedule.availability[6]),
        };
        table.push(row);
        console.log(row);
      }
      setSchedule(table);
    })
    .catch(() => history.push('/error'))
  }

  function availabilityToString(availability) {
    if (availability.off) {
      return "Off";
    }
    return hourToAmPmString(availability.start) + " - " + hourToAmPmString(availability.end);
  }

  function hourToAmPmString(hour) {
    return (hour % 12) + (hour < 12 ? "A" : "P") + "M";
}

const dateMaker = (weeksOffset) => {
  let monday = getMonday(new Date());
  let offsetMonday = addDays(monday, weeksOffset * 7);
  let offsetSunday = addDays(offsetMonday, 6);
  return offsetMonday.toLocaleDateString() + ' to ' + offsetSunday.toLocaleDateString(); // Weeks are Monday to Sunday
}

const mondayMaker = (weeksOffset) => {
  return addDays(getMonday(new Date()), weeksOffset * 7);
} 

function getMonday(date) {
  date = new Date(date);
  let day = date.getDay();
  let diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const [dateString, setDateString] = useState(dateMaker(0));

  return (
    <MaterialTable
      icons={tableIcons}
      title={'Employee Schedule for week of: ' + dateString}
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
      isLoading={employeeSchedule.length === 0}
      components={{
        Actions: props => (
          <React.Fragment>
          <Button
            onClick={(event) => setOpen(true)}
            color="primary"
            variant="contained"
            style={{textTransform: 'none', marginRight: 15, marginLeft: 15}}
            size="small"
          >
            Change Week
          </Button>
          <Dialog onClose={() => setOpen(false)} open={open}>
          <DialogTitle>Select Week to change</DialogTitle>
          <List>
            {[0,1,2,3,4].map((weeksOffset) => (
              <ListItem button onClick={() => {setDateString(dateMaker(weeksOffset)); refreshSchedule(mondayMaker(weeksOffset)); setOpen(false)}} key={weeksOffset}>
                <ListItemText primary={dateMaker(weeksOffset)} />
              </ListItem>
            ))}
          </List>
          </Dialog>
          </React.Fragment>
        )
      }}
    />
  );
}