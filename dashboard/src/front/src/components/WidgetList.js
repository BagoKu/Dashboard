import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        flexDirection: 'row',
    },
}));

function WidgetList(props) {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Container>
                <Box display={'flex'} flexDirection={'row'}>
                    {props.widgets.map((item, index) => (
                        <Card key={`cards-${index}`} style={{margin: 10}}>
                            <CardHeader avatar={item.icon} title={item.name} style={{backgroundColor: '#3f51b5', color: 'white'}}/>
                            <CardContent>
                                {item.content}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </main>
    );
}

export default WidgetList;