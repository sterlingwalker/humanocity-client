import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeCard from './HomeCard'

const useStyles = makeStyles({
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'auto', 
        gridGap: '1rem',
        marginTop: '80px'
      }
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.cards}>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/person.svg'} title="Personal Time Off" description="Employees' requested time off" />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/people.svg'} title="User Management" description="Add, remove, and manage employees" url={'/employees'} />
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/schedule.svg'} title="Schedule" description="Weekly employee schedule"  url={'/schedule'}/>
      <HomeCard icon={process.env.PUBLIC_URL + 'icons/feedback.svg'} title="Feedback" description="Employee complaints and feedback" />
    </div>
  );
}