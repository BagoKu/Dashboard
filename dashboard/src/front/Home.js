import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core";
import React from "react";
import {AppBar} from "@material-ui/core";
import SignUpTab from "./SignUp";
import SignInTab from "./SignIn";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function Content(index) {
    return {
        id: `tabpanel-${index}`,
    };
}

function Home() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label={'Sign In'} {...Content(0)}/>
                    <Tab label={'Sign Up'} {...Content(1)}/>
                </Tabs>
            </AppBar>
            <SignInTab value={value} index={0}/>
            <SignUpTab value={value} index={1}/>
        </div>
    );
}

export default Home