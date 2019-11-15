import axios from 'axios';

async function findWeather(_city) {
    const ret = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${_city}`, {
        method: 'GET',
        params: {
            lang: 'fr',
            units: 'metric',
            appid: '8cd957d713cdc8c7ba069632390d39a5'
        }
    });
    console.log(ret);
    return (ret);
}

export default findWeather;
