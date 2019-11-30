import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {Modal} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import user from "../ConnectToApi";
import Cookies from "js-cookie";

const spacesIcon = [
    {
        icon: <HomeRoundedIcon/>
    },
    {
        icon: <WorkRoundedIcon/>
    },
    {
        icon: <ShareRoundedIcon/>
    },
];

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function DashboardModal(props) {

    const classes = useStyles();
    const [openSpaceModal, setOpenSpaceModal] = React.useState(false);
    const [spaceToAdd, setSpaceToAdd] = React.useState('');

    const handleSpaceModalOpen = () => {
        setOpenSpaceModal(true);
    };

    const handleSpaceModalClose = () => {
        setOpenSpaceModal(false);
    };

    const handleSpaceToAdd = event => {
        setSpaceToAdd(event.target.value);
    };

    const addUserSpace = (Name, Icon) => {
        props.setDashboards(props.dashboards.concat([{name: Name, icon: Icon}]));
        props.setWidgets(props.widgets.concat([{name: Name, widgets: []}]));
        user.addDashboard(Cookies.get('_email'), Name, Icon);
    };

    const closeDashboardModal = (iconToAdd) => {
        handleSpaceModalClose();
        addUserSpace(document.getElementById("dashboard-name").value, iconToAdd);
    };

    return (
        <div>
            <List>
                <ListItem button onClick={function() {handleSpaceModalOpen()}}>
                    <ListItemIcon><AddIcon/></ListItemIcon>
                    <ListItemText primary={'Add new dashboard'}/>
                </ListItem>
            </List>
            <div>
                <Modal className={classes.modal}
                       open={openSpaceModal}
                       onClose={() => handleSpaceModalClose}
                       closeAfterTransition
                       BackdropComponent={Backdrop}
                       BackdropProps={{
                           timeout: 500,
                       }}
                >
                    <Fade in={openSpaceModal}>
                        <Paper className={classes.paper}>
                            <Select
                                id={'dashboard-icon'}
                                value={spaceToAdd}
                                onChange={handleSpaceToAdd}
                            >
                                {spacesIcon.map((space, index) => (
                                    <MenuItem key={`dashboardIcon-${index}`} value={space.icon}>
                                        {space.icon}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField id={'dashboard-name'} label="Name of the dashboard" margin="normal"/>
                            <Button onClick={() => closeDashboardModal(spaceToAdd)}>
                                OK
                            </Button>
                        </Paper>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

export default DashboardModal;
