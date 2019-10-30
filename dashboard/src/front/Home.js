import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';


function Home() {
    return (
        <Grid container justify='center'>
            <Button variant="contained" color="primary">
                Home
            </Button>
        </Grid>
    );
}
export default Home