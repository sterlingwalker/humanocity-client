import React from 'react';
import Alert from '@material-ui/lab/Alert';


const NoMatch = ({ history }) => {
  return (
    <div>
      <Alert severity="error">
        Oops! The page that you are trying to reach doesn't exist. Please return to the <span style={{ color: "blue" }} onClick={() => history.push("/")}>
          {" "}
          Home Page{" "}
        </span>
      </Alert>
    </div>
  );
};

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

export default NoMatch;
