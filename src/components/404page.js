import Alert from '@material-ui/lab/Alert';
import React, {Component} from 'react';
import HomePage from './HomePage'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom';

class Foo extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3500)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return this.state.redirect
      ? <Redirect to="/" />
      : <Alert severity="error">
      Oops! The page that you are trying to reach doesn't exist. Redirecting you to the <span style={{ color: "blue" }} onClick={() => <Route exact path='/' component={HomePage} />}>
        {" "}
        Home Page{" "}
      </span>
    </Alert>
  }
}


export const ServerError = ({ history }) => {
  return (
    <div>
      <Alert severity="error">
        An error as occurred when trying to reach the server. Please return to the <span style={{ color: "blue" }} onClick={() => history.push("/")}>
          {" "}
          Home Page{" "}
        </span>
      </Alert>
    </div>
  );
};

export default Foo;
