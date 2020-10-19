import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    boxShadow: '0 3px 5px 4px #DDD',
  },
  media: {
    height: 120,
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem'
  }
});

export default function HomeCard(props) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Card className={classes.root} onClick={() => history.push(props.url)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.icon}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}