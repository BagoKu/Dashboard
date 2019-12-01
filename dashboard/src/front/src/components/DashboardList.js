import React from 'react';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import TextField from "@material-ui/core/TextField";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";
import Cookies from "js-cookie";
import user from "../ConnectToApi";


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

function DashboardList(props) {

    const handleCurrentDashboardName = (name, icon) => {
        let tmpObj = {name: name, icon: icon};

        props.setCurrentDashboards(tmpObj);
    };

    const handleCurrentWidgetsToDisplay = (widgetsToDisplay) => {
        let tmpArr = [];

        for (let i = 0; i < widgetsToDisplay.length; i++) {
            for (let j = 0; j < widgets.length; j++) {
                if (widgetsToDisplay[i] === widgets[j].name) {
                    tmpArr.push({name: widgets[j].name, icon: widgets[j].icon, content: widgets[j].content});
                }
            }
        }
        props.setCurrentWidgets(tmpArr);
    };

    const handle = (dashboardName, icon) => {

        let changed = 0;
        handleCurrentDashboardName(dashboardName, icon);

        console.log(dashboardName);
        console.log(JSON.stringify(props.widgets));
        for (let i = 0; i < props.widgets.length; i++) {
            if (props.widgets[i].name === dashboardName) {
                changed = 1;
                handleCurrentWidgetsToDisplay(props.widgets[i].widgets);
                break;
            }
        }
        if (changed === 0) {
            props.setCurrentWidgets([]);
        }
    };

    const removeDashboard = (dashboardName) => {

        let tmpArray = [...props.dashboards];

        for (let i = 0; i < props.dashboards.length; i++) {
            if (props.dashboards[i].name === dashboardName) {
                props.setDashboards(tmpArray.filter(item => item.name !== dashboardName));
                break;
            }
        }
        user.deleteData(Cookies.get('_email'), dashboardName, "dashboard");
    };

    return (
        <List>
            {props.dashboards.map((space, index) => (
                <ListItem key={`section-${index}`} button onClick={function() {handle(space.name, space.icon)}}>
                    <ListItemIcon>{space.icon}</ListItemIcon>
                    <ListItemText primary={space.name}/>
                    {space.name !== "Home" && <ListItemSecondaryAction><IconButton onClick={() => removeDashboard(space.name)} ><RemoveIcon/></IconButton></ListItemSecondaryAction>}
                </ListItem>
            ))}
        </List>
    );
}

export default DashboardList;
