import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from "@reach/router"
import user from "./../back/ConnectToApi";
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#2196f3',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignInTab(props) {
    const { value, index } = props;
    const classes = useStyles();
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    var connect  = '/'

    const handleClick= async (event) => {
        var res = await user.findUser(email, password);
        if (res === "ko") {
            alert("user not found")
        } else {
            Cookies.set('username', res);
            window.location = '/dashboard';
        }
    };


    return (
        <Container component={'div'} hidden={value !== index} id={`tabpanel-${index}`} maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={event => getEmail(event.target.value)}
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={event => getPassword(event.target.value)}
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={(event)=> handleClick(event)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        component={Link} to={connect}>
                        Sign in
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default SignInTab
