import React from 'react';
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router"
import Grid from '@material-ui/core/Grid';


const customStyle = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Home() {
    const style = customStyle();
    return (
        <Container component="main">
            <CssBaseline/>
            <div className={style.paper}>
                <Typography>The Awesome Dashboard</Typography>
                <Button type="submit" variant="contained" color="primary" className={style.submit} component={Link} to={"/signup"} >Try now!</Button>
            </div>
        </Container>
    );
}
export default Home