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
  const [monday, setMonday] = useState(getMonday());
  const [employeeSchedule, setSchedule] = useState([]);
  useEffect(() => {
    refreshSchedule(getMonday());   // eslint-disable-next-line
  }, []);

  const refreshSchedule = (scheduleMonday) => {
    setSchedule([]);
    getSchedule(scheduleMonday)
    .then(response => {
      let table = [];
      for (let index = 0; index < response.length; index++) {
        const employeeSchedule = response[index];
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
      }
      setSchedule(table);
    })
    .catch(() => history.push('/error'))
  }

  function availabilityToString(availability) {
    if (availability.off) {
      return markStringModified("Off", availability.modified);
    }
    return markStringModified(hourToAmPmString(availability.start) + " - " + hourToAmPmString(availability.end), availability.modified);
  }

  function markStringModified(str, modified) {
    return modified ? `[ ${str} ]` : str;
  }

  function hourToAmPmString(hour) {
    return (hour % 12) + (hour < 12 ? "A" : "P") + "M";
  }

  const mondayToDateRangeString = (monday) => {
    let mondayDate = new Date(monday);
    let sundayDate = addDays(mondayDate, 6);
    return mondayDate.toLocaleDateString() + ' to ' + sundayDate.toLocaleDateString(); // Weeks are Monday to Sunday
  }

  function getMonday(date = new Date()) {
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

  const customHeaderStyle = {
    backgroundColor: '#6C6FA5',
    color: '#ffffff'
  } 

  return (
    <MaterialTable
      icons={tableIcons}
      title={'Employee Schedule for week of: ' + mondayToDateRangeString(monday)}
      columns={[
        { title: 'Employee', field: 'Employee', headerStyle: customHeaderStyle},
        { title: 'Monday', field: 'Monday', headerStyle: customHeaderStyle },
        { title: 'Tuesday', field: 'Tuesday', headerStyle: customHeaderStyle },
        { title: 'Wednesday', field: 'Wednesday', headerStyle: customHeaderStyle },
        { title: 'Thursday', field: 'Thursday', headerStyle: customHeaderStyle },
        { title: 'Friday', field: 'Friday', headerStyle: customHeaderStyle },
        { title: 'Saturday', field: 'Saturday', headerStyle: customHeaderStyle },
        { title: 'Sunday', field: 'Sunday', headerStyle: customHeaderStyle }
      ]}
      data={employeeSchedule}
      isLoading={employeeSchedule.length === 0}
      components={{
        Actions: props => (
          <React.Fragment>
            <div  style={{display: "flex"}}>
              <Button
                onClick={() => {
                  let previousMonday = addDays(monday, -7);
                  setMonday(previousMonday);
                  refreshSchedule(previousMonday);
                }}
                color="primary"
                variant="contained"
                style={{textTransform: 'none', marginLeft: 10}}
                size="small"
              >
                <ChevronLeft/> Previous Week
              </Button>
              <Button
                onClick={() => {
                  let nextMonday = addDays(monday, 7);
                  setMonday(nextMonday);
                  refreshSchedule(nextMonday);
                }}
                color="primary"
                variant="contained"
                style={{textTransform: 'none', marginLeft: 10}}
                size="small"
              >
                Next Week <ChevronRight/>
              </Button>
            </div>
          </React.Fragment>
        )
      }}
    />
  );
}
