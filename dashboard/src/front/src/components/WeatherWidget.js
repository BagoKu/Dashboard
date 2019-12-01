import React, {useState} from 'react';
import apis from "../ConnectToOtherApi";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    weatherIcon: {
        width: 70,
        height: 70
    }
});

function WeatherWidget() {

    const classes = useStyles();
    const [data, setData] = useState([]);

    const getWeather = () => {
        let input = document.getElementById("city-input").value;
        apis.findWeather(input).then(res => {
            let tmpObj = [{
                city: res.data.name,
                country: res.data.sys.country,
                coord: res.data.coord,
                icon: "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png",
                temp: res.data.main.temp,
            }];
            setData(tmpObj);
        })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div>
                <TextField label={"Enter city name"} id={"city-input"}/>
                <Button onClick={() => getWeather()} >OK</Button>
            </div>
            <Divider/>
            <div>
                {data.map((item, index) => (
                    <div key={`info-${index}`}>
                        <Typography variant={"h4"}>{item.city + ", " + item.country}</Typography>
                        <div>
                            <Avatar src={item.icon} className={classes.weatherIcon}/>
                            <Typography variant={"h4"}>{item.temp + "°"}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherWidget;