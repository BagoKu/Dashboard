import { Router } from "@reach/router";
import Overview from "./front/Overview";
import SignUp from "./front/SignUp";
import { Link } from "@reach/router"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Home from './front/Home';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});


function App() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
      <div>
          <Paper className={classes.root}>
              <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
                  <Tab label={'Home'} component={Link} to={'/'}/>
                  <Tab label={'Sign Up'} component={Link} to={'/signup'}/>
              </Tabs>
          </Paper>
          <Router>
              <Home path={'/'}/>
              <SignUp path={'/signup'}/>
          </Router>
      </div>
  );
}

export default App;
