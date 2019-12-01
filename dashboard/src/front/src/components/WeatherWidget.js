import React, {useState, useEffect} from 'react';
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
    const wdata = {"coord":{"lon":3.07,"lat":50.63},"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"base":"stations","main":{"temp":4.21,"pressure":1019,"humidity":67,"temp_min":2.78,"temp_max":5.56},"visibility":10000,"wind":{"speed":6.2,"deg":20},"clouds":{"all":100},"dt":1575214847,"sys":{"type":1,"id":6559,"country":"FR","sunrise":1575185208,"sunset":1575215209},"timezone":3600,"id":2998324,"name":"Lille","cod":200};
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);

    const getWeather = () => {
        let tmpObj = [{
            city: wdata.name,
            country: wdata.sys.country,
            coord: wdata.coord,
            icon: "http://openweathermap.org/img/w/" + wdata.weather[0].icon + ".png",
            temp: wdata.main.temp,
            humidity: wdata.main.humidity,
        }];
        setInput(document.getElementById("city-input").value);
        setData(tmpObj);
        /*apis.findWeather(input).then(res => setWeather(res.data));
         */
    };

    return (
        <div>
            <div>
                <TextField id={"city-input"}/>
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