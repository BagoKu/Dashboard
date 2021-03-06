import React from 'react';
import clsx from 'clsx';
import {Link} from '@reach/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from "@material-ui/core/Divider";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DashboardList from "./components/DashboardList";
import DashboardModal from "./components/DashboardModal";
import WidgetList from "./components/WidgetList";
import WidgetModal from "./components/WidgetModal";
import user from "./ConnectToApi";
import Cookies from "js-cookie";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import Button from "@material-ui/core/Button";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
import WeatherWidget from "./components/WeatherWidget";
import YoutubeWidget from "./components/YoutubeWidget";
import TwitchWidget from "./components/TwitchWidget";
import WikipediaWidget from "./components/WikipediaWidget";
import MoviedbWidget from "./components/MoviedbWidget";
import NewsWidget from "./components/NewsWidget";

const drawerWidth = 240;

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
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
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
    decoBtn: {
        position: 'absolute',
        color: 'white',
        backgroundColor: '#3f51b5',
        top: theme.spacing(2),
        right: theme.spacing(4),
    },
}));

const spacesIcon = [
    {
        name: "HomeRoundedIcon",
        icon: <HomeRoundedIcon/>
    },
    {
        name: "WorkRoundedIcon",
        icon: <WorkRoundedIcon/>
    },
    {
        name: "ShareRoundedIcon",
        icon: <ShareRoundedIcon/>
    },
];

const widgets = [
    {
        name: 'Weather',
        icon: <WbSunnyRoundedIcon/>,
        content: <WeatherWidget/>
    },
    {
        name: 'Youtube',
        icon: <PlayCircleOutlineRoundedIcon/>,
        content: <YoutubeWidget/>
    },
    {
        name: 'Twitch',
        icon: <LiveTvRoundedIcon/>,
        content: <TwitchWidget/>
    },
    {
        name: 'Wikipedia',
        icon: <LanguageRoundedIcon/>,
        content: <WikipediaWidget/>
    },
    {
        name: 'Movies',
        icon: <TheatersRoundedIcon/>,
        content: <MoviedbWidget/>
    },
    {
        name: 'News',
        icon: <LibraryBooksRoundedIcon/>,
        content: <NewsWidget/>
    }
];

function Dashboard() {

    React.useEffect(() => {
        async function loadUserData() {
            const dash = await user.loadDashboards(Cookies.get('_email'), Cookies.get('_password'));
            let tmpArrObj = [];
            let homeDash = [];
            for (let i = 0; dash[i]; i++) {
                let tmpObj = {name: dash[i]._name, icon: <HomeRoundedIcon/>};
                if (dash[i]._type === "dashboard") {
                    for (let j = 0; j < spacesIcon.length; j++) {
                        if (dash[i]._icon === spacesIcon[j].name) {
                            tmpObj.icon = spacesIcon[j].icon;
                        }
                    }
                    tmpArrObj.push(tmpObj);
                }
            }
            homeDash.push(tmpArrObj[0]);
            setUserDashboards(tmpArrObj);
            setCurrentDashboardDisplay(homeDash);
        }
        async function loadWidgets() {
            const widget = await user.loadDashboards(Cookies.get('_email'), Cookies.get('_password'));

            let tmpArrObj = [{name: 'Home', widgets: []}];
            let widgetsToDisplay = [];
            for (let i = 0; widget[i]; i++) {
                if (widget[i]._type === "widget") {
                    for (let j = 0; tmpArrObj[j]; j++) {
                        if (tmpArrObj[j].name === widget[i]._link) {
                            tmpArrObj[j].widgets.push(widget[i]._name)
                        } else {
                            let tmpObj = {name: '', widgets: []};
                            tmpObj.name = widget[i]._link;
                            tmpObj.widgets.push(widget[i]._name);
                            tmpArrObj.push(tmpObj);
                        }
                    }
                }
            }
            setUserWidgets(tmpArrObj);
            for (let i = 0; i < tmpArrObj[0].widgets.length; i++) {
                for (let j = 0; j < widgets.length; j++) {
                    if (tmpArrObj[0].widgets[i] === widgets[j].name) {
                        widgetsToDisplay.push(widgets[j]);
                    }
                }
            }
            setCurrentWidgetDisplay(widgetsToDisplay);
        }
        loadUserData();
        loadWidgets();
    }, []);
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [userWidgets, setUserWidgets] = React.useState([]);
    const [userDashboards, setUserDashboards] = React.useState([{name: "Home", icon: <HomeRoundedIcon/>}]);
    const [currentWidgetDisplay, setCurrentWidgetDisplay] = React.useState([]);
    const [currentDashboardDisplay, setCurrentDashboardDisplay] = React.useState([{name: 'Home', icon: <HomeRoundedIcon/>}]);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
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
                    <Typography>{currentDashboardDisplay ? "Home" : currentDashboardDisplay.name}</Typography>
                    {currentDashboardDisplay ? <HomeRoundedIcon/> : currentDashboardDisplay.icon}
                    <Button className={classes.decoBtn} component={Link} to={'/'}>Log out</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={
                    clsx(classes.drawer, {
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
                <DashboardList
                    customWidgets={widgets}
                    dashboards={userDashboards} setDashboards={setUserDashboards}
                    widgets={userWidgets} setWidgets={setUserWidgets}
                    currentDashboards={currentDashboardDisplay} setCurrentDashboards={setCurrentDashboardDisplay}
                    currentWidgets={currentWidgetDisplay} setCurrentWidgets={setCurrentWidgetDisplay}
                />
                <Divider/>
                <DashboardModal
                    dashboards={userDashboards} setDashboards={setUserDashboards}
                    widgets={userWidgets} setWidgets={setUserWidgets}
                />
            </Drawer>
            <WidgetList
                widgets={currentWidgetDisplay} setWidgets={setCurrentWidgetDisplay}
            />
            <WidgetModal
                customWidgets={widgets}
                widgets={userWidgets} setWidgets={setUserWidgets}
                currentDashboards={currentDashboardDisplay} setCurrentDashboards={setCurrentDashboardDisplay}
                currentWidgets={currentWidgetDisplay} setCurrentWidgets={setCurrentWidgetDisplay}
            />
        </div>
    );
}
export default Dashboard
