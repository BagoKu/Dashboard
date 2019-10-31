import React from "react";
import {Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

function Dashboard() {
    return (
        <Container>
            <div>
                <CssBaseline/>
                <Drawer variant={'permanent'}
                >
                    <div>
                        <AssignmentIcon/>
                    </div>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{<AddCircleOutline/>}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        </Container>
    );
}

export default Dashboard