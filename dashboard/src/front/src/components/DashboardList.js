import React from 'react';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import Cookies from "js-cookie";
import user from "../ConnectToApi";

function DashboardList(props) {

    const handleCurrentDashboardName = (name, icon) => {
        let tmpObj = {name: name, icon: icon};

        props.setCurrentDashboards(tmpObj);
    };

    const handleCurrentWidgetsToDisplay = (widgetsToDisplay) => {
        let tmpArr = [];

        for (let i = 0; i < widgetsToDisplay.length; i++) {
            for (let j = 0; j < props.customWidgets.length; j++) {
                if (widgetsToDisplay[i] === props.customWidgets[j].name) {
                    tmpArr.push({name: props.customWidgets[j].name, icon: props.customWidgets[j].icon, content: props.customWidgets[j].content});
                }
            }
        }
        props.setCurrentWidgets(tmpArr);
    };

    const handle = (dashboardName, icon) => {

        let changed = 0;
        handleCurrentDashboardName(dashboardName, icon);

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
        handleCurrentDashboardName(props.dashboards[0].name, props.dashboards[0].icon);
        handleCurrentWidgetsToDisplay(props.widgets[0].widgets);
        user.deleteData(Cookies.get('_email'), dashboardName, "dashboard");
    };

    return (
        <List>
            {props.dashboards.map((space, index) => (
                <ListItem key={`section-${index}`} button onClick={function() {handle(space.name, space.icon)}}>
                    <ListItemIcon>{space.icon}</ListItemIcon>
                    <ListItemText primary={space.name}/>
                    {space.name !== "Home" && <IconButton onClick={() => removeDashboard(space.name)} ><RemoveIcon/></IconButton>}
                </ListItem>
            ))}
        </List>
    );
}

export default DashboardList;
