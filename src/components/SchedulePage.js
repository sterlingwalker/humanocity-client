import React, { forwardRef, useState } from 'react';
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
  const [open, setOpen] = useState()

// Server will handle this eventually
const dateMaker = (date) => {
  let curr = new Date()
  curr.setDate(curr.getDate() + date)
  let first = curr.getDate() - curr.getDay()
  let last = first + 6
  let firstday = new Date(curr.setDate(first))
  let lastday = new Date(curr.setDate(last))
  return firstday.toLocaleDateString() + ' to ' + lastday.toLocaleDateString()
}
const [dateString, setDateString] = useState(dateMaker(0))

const futureWeeks = [7,14,21,28]

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
      components={{
        Header: props => (
          <React.Fragment>
          <Button
            onClick={(event) => setOpen(true)}
            color="primary"
            variant="contained"
            style={{textTransform: 'none', marginLeft: 15}}
            size="small"
          >
            Change Week
          </Button>
          <Dialog onClose={() => setOpen(false)} open={open}>
          <DialogTitle>Select Week to change</DialogTitle>
          <List>
            {futureWeeks.map((week) => (
              <ListItem button onClick={() => {setDateString(dateMaker(week)); setOpen(false)}} key={week}> {/* Eventually will fetch new data from server */}
                <ListItemText primary={dateMaker(week)} />
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