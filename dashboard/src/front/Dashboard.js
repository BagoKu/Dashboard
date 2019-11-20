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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {Modal} from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';
import ShareIcon from '@material-ui/icons/Share';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";

const drawerWidth = 240;

const spacesIcon = [
    {
        icon: <HomeIcon/>
    },
    {
        icon: <WorkIcon/>
    },
    {
        icon: <ShareIcon/>
    },
];

const widgets = [
    {
        name: 'Messenger',
    },
    {
        name: 'Instagram',
    },
    {
        name: 'Twitter',
    },
    {
        name: 'Outlook',
    },
    {
        name: 'GitHub',
    },
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
    const [spaceToAdd, setSpaceToAdd] = React.useState(null);
    const [widgetToAdd, setWidgetToAdd] = React.useState('');
    const [userDashboards, setuserDashboards] = React.useState([{name: 'Home', icon: <HomeIcon/>}]);
    const [userWidgets, setUserWidgets] = React.useState([{name: 'Home', widgets: []}]);
    const [currentDashboardName, setCurrentDashboardName] = React.useState('Home');
    const [currentWidgetsToDisplay, setCurrentWidgetsToDisplay] = React.useState([]);

    const handleCurrentWidgetsToDisplay = (widgets) => {
        setCurrentWidgetsToDisplay(widgets);
    };

    const handleCurrentDashboardName = (name) => {
        setCurrentDashboardName(name);
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
        setUserWidgets(userWidgets.concat([{name: Name, widgets: []}]))
    };

    const addUserWidget = (dashboardName, widgetToAdd) => {
        for (let i = 0; i < userWidgets.length; i++) {
            if (userWidgets[i].name === dashboardName) {
                setUserWidgets(userWidgets[i].widgets.push([widgetToAdd]));
                alert(userWidgets[i].widgets);
                handleCurrentWidgetsToDisplay(userWidgets[i].widgets);
            }
        }
    };

    const closeDashboardModal = (iconToAdd) => {
        handleSpaceModalClose();
        addUserSpace(document.getElementById("dashboard-name").value, iconToAdd);
    };

    const handle = (dashboardName) => {
        handleCurrentDashboardName(dashboardName);
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
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard: {currentDashboardName}
                    </Typography>
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
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <List>
                    {userDashboards.map(space => (
                        <ListItem button onClick={function() {handle(space.name)}}>
                            <ListItemIcon>{space.icon}</ListItemIcon>
                            <ListItemText primary={space.name}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
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
                                    {spacesIcon.map(space => (
                                        <MenuItem key={space.icon} value={space.icon}>
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
                        {currentWidgetsToDisplay.map(item => (
                            <Card style={{margin: 10}}>
                                <CardHeader avatar={<FaFacebookMessenger/>} title={item}/>
                                <CardMedia/>
                                <CardContent>
                                    <Typography>{item}</Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton>
                                        <FavoriteIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </main>
            <div>
                <Fab className={classes.addButton} onClick={handleModalOpen}>
                    <AddIcon/>
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
                                {widgets.map(widget => (
                                    <MenuItem key={widget.name} value={widget.name}>
                                        {widget.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button className={classes.button} onClick={function(event) {handleModalClose(); addUserWidget(currentDashboardName, widgetToAdd); alert('Widget added');}}>
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