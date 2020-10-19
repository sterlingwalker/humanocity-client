import React from 'react';
import HomeCard from './HomeCard'
import Grid from '@material-ui/core/Grid'

export default function HomePage() {

  return (
    <div >
      <Grid container  direction="row" wrap='wrap' spacing={2}>
        <Grid item xs>
          <HomeCard icon={process.env.PUBLIC_URL + '/icons/person.svg'} title="Personal Time Off" description="Employees' requested time off" url={'/timeoff'}/>
        </Grid>
        <Grid item xs>
          <HomeCard icon={process.env.PUBLIC_URL + '/icons/people.svg'} title="User Management" description="Add, remove, and manage employees" url={'/employees'} />
        </Grid>
      </Grid>
      <Grid container  direction="row" wrap='wrap' spacing={2}>
        <Grid item xs>
          <HomeCard icon={process.env.PUBLIC_URL + '/icons/schedule.svg'} title="Schedule" description="Weekly employee schedule"  url={'/schedule'}/>
        </Grid>
        <Grid item xs>
          <HomeCard icon={process.env.PUBLIC_URL + '/icons/feedback.svg'} title="Feedback" description="Employee complaints and feedback" url={'/feedback'}/>
        </Grid>
      </Grid>
    </div>
  );
}