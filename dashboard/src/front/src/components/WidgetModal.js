import React from 'react'
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Modal} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";

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
}));

function WidgetModal(props) {

    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [widgetToAdd, setWidgetToAdd] = React.useState('');

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleChange = event => {
        setWidgetToAdd(event.target.value);
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

    const addWidgetToDashboard = (name, dashboard, widgetToAdd, index) => {

        let tmpArray = props.widgets;
        let tmpObject = {name: name, widgets: dashboard.widgets};

        tmpObject.widgets.push(widgetToAdd);
        tmpArray[index] = tmpObject;
        props.setWidgets(tmpArray);
    };

    const addUserWidget = (dashboardName, widgetToAdd) => {

        let i = 0;

        for (; i < props.widgets.length; i++) {
            if (props.widgets[i].name === dashboardName) {
                addWidgetToDashboard(dashboardName, props.widgets[i], widgetToAdd, i);
                handleCurrentWidgetsToDisplay(props.widgets[i].widgets);
            }
        }
    };

    return (
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
                            {widgets.map((widget, index) => (
                                <MenuItem key={`widgets-${index}`} value={widget.name}>
                                    {widget.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button className={classes.button} onClick={function(event) {handleModalClose(); addUserWidget(props.currentDashboards.name, widgetToAdd);}}>
                            OK
                        </Button>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}

export default WidgetModal;