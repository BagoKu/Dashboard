import React from 'react';
import clsx from 'clsx';
import {FaFacebookMessenger} from 'react-icons/fa';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import Fab from '@material-ui/core/Fab';
import {Modal} from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Cookies from 'js-cookie';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import apis from './ConnectToOtherApi'

const drawerWidth = 240;

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

const widgets = [
    {
        name: 'Weather',
        icon: <WbSunnyRoundedIcon/>,
        content: <TextField/>
    },
    {
        name: 'Youtube',
        icon: <PlayCircleOutlineRoundedIcon/>,
        content: <TextField/>
    },
    {
        name: 'Twitch',
        icon: <LiveTvRoundedIcon/>,
        content: <TextField/>
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
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
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
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
    menu: {
        width: 200,
    },
    selection: {
        top: 5,
        left: 20,
    },
    button: {
        backgroundColor: '#3f51b5',
        color: 'white',
        top: 20,
        left: 35,
    },
    card: {
        maxWidth: 345,
    },
    servicesDisplay: {
        padding: theme.spacing(3),
        backgroundColor: 'steelblue',
    },
}));

function Dashboard() {

    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [openSpaceModal, setOpenSpaceModal] = React.useState(false);
    const [spaceToAdd, setSpaceToAdd] = React.useState('');
    const [widgetToAdd, setWidgetToAdd] = React.useState('');
    const [userDashboards, setuserDashboards] = React.useState([{name: 'Home', icon: <HomeRoundedIcon/>}]);
    const [userWidgets, setUserWidgets] = React.useState([{name: 'Home', widgets: []}]);
    const [currentDashboardName, setCurrentDashboardName] = React.useState({name: 'Home', icon: <HomeRoundedIcon/>});
    const [currentWidgetsToDisplay, setCurrentWidgetsToDisplay] = React.useState([]);

    const handleCurrentWidgetsToDisplay = (widgetsToDisplay) => {

        let tmpArr = [];

        for (let i = 0; i < widgetsToDisplay.length; i++) {
            for (let j = 0; j < widgets.length; j++) {
                if (widgetsToDisplay[i] === widgets[j].name) {
                    tmpArr.push({name: widgets[j].name, icon: widgets[j].icon, content: widgets[j].content});
                }
            }
        }
        setCurrentWidgetsToDisplay(tmpArr);
    };

    const handleCurrentDashboardName = (name, icon) => {
        let tmpObj = {name: name, icon: icon};

        setCurrentDashboardName(tmpObj);
    };

    const getUsername = () => {
      const username = Cookies.get('username');
      console.log(username);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleSpaceModalOpen = () => {
        setOpenSpaceModal(true);
    };

    const handleSpaceModalClose = () => {
        setOpenSpaceModal(false);
    };

    const handleSpaceToAdd = event => {
        setSpaceToAdd(event.target.value);
    };

    const handleChange = event => {
        setWidgetToAdd(event.target.value);
    };

    const addUserSpace = (Name, Icon) => {
        setuserDashboards(userDashboards.concat([{name: Name, icon: Icon}]));
        setUserWidgets(userWidgets.concat([{name: Name, widgets: []}]));
    };

    const addWidgetToDashboard = (name, dashboard, widgetToAdd, index) => {

        let tmpArray = userWidgets;
        let tmpObject = {name: name, widgets: dashboard.widgets};

        tmpObject.widgets.push(widgetToAdd);
        tmpArray[index] = tmpObject;
        setUserWidgets(tmpArray);
    };

    const addUserWidget = (dashboardName, widgetToAdd) => {

        let i = 0;

        for (; i < userWidgets.length; i++) {
            if (userWidgets[i].name === dashboardName) {
                addWidgetToDashboard(dashboardName, userWidgets[i], widgetToAdd, i);
                handleCurrentWidgetsToDisplay(userWidgets[i].widgets);
            }
        }
    };

    const closeDashboardModal = (iconToAdd) => {
        handleSpaceModalClose();
        addUserSpace(document.getElementById("dashboard-name").value, iconToAdd);
    };

    const handle = (dashboardName, icon) => {
        handleCurrentDashboardName(dashboardName, icon);
        let i = 0;

        for (; i < userWidgets.length; i++) {
            if (userWidgets[i].name === dashboardName) {
                handleCurrentWidgetsToDisplay(userWidgets[i].widgets);
            }
        }
    };

    const removeDashboard = (dashboardName) => {

        let tmpArray = userWidgets;
        let arrayLen = tmpArray.length;
        let i = 0;

        for (; i < userWidgets.length; i++) {
            if (userWidgets[i].name === dashboardName) {
                console.log(dashboardName);
                console.log(JSON.stringify(tmpArray));
                console.log(JSON.stringify(tmpArray.slice(0, i).concat(tmpArray.slice(i + 1, arrayLen))));
                console.log(JSON.stringify(tmpArray.filter(item => item.name !== dashboardName)));
                handleCurrentWidgetsToDisplay(userWidgets[0].widgets);
                handleCurrentDashboardName(dashboardName);
                setUserWidgets(userWidgets.filter(item => item.name !== dashboardName));
                break;
            }
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                    >
                        <MenuRoundedIcon/>
                    </IconButton>
                    <Typography>{currentDashboardName.name}</Typography>
                    {currentDashboardName.icon}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: openDrawer,
                    [classes.drawerClose]: !openDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: openDrawer,
                        [classes.drawerClose]: !openDrawer,
                    }),
                }}
                open={openDrawer}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <List>
                    {userDashboards.map((space, index) => (
                        <ListItem key={`section-${index}`} button onClick={function() {handle(space.name, space.icon)}}>
                            <ListItemIcon>{space.icon}</ListItemIcon>
                            <ListItemText primary={space.name}/>
                            {space.name !== "Home" && <ListItemSecondaryAction><IconButton><RemoveRoundedIcon/></IconButton></ListItemSecondaryAction>}
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={function() {handleSpaceModalOpen()}}>
                        <ListItemIcon><AddRoundedIcon/></ListItemIcon>
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
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container>
                    <Box display={'flex'} flexDirection={'row'}>
                        {currentWidgetsToDisplay.map((item, index) => (
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
            <div>
                <Fab className={classes.addButton} onClick={handleModalOpen}>
                    <AddRoundedIcon/>
                </Fab>
                <Modal className={classes.modal}
                       open={openModal}
                       onClose={handleModalClose}
                       closeAfterTransition
                       BackdropComponent={Backdrop}
                       BackdropProps={{
                           timeout: 500,
                       }}
                >
                    <Fade in={openModal}>
                        <Paper className={classes.paper}>
                            <TextField  className={classes.selection}
                                        select
                                        value={widgetToAdd}
                                        onChange={handleChange}
                                        SelectProps={{
                                           MenuProps: {
                                               className: classes.menu,
                                           },
                                        }}
                                        helperText="Please select the new widget to add"
                                        margin={"normal"}
                            >
                                {widgets.map((widget, index) => (
                                    <MenuItem key={`widgets-${index}`} value={widget.name}>
                                        {widget.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button className={classes.button} onClick={function(event) {handleModalClose(); addUserWidget(currentDashboardName.name, widgetToAdd);}}>
                                OK
                            </Button>
                        </Paper>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}
export default Dashboard
