import axios from 'axios';

async function findWeather(_city) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${_city}`, {
        method: 'GET',
        params: {
            lang: 'fr',
            units: 'metric',
            appid: 'aad5d156440ea3021a5d57a388fd82bc'
        }
    })
    .then(res => res)
    .catch(e => console.error(e))
}

async function requestYoutube(_urlVideo) {
    var reg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var _id = _urlVideo.match(reg);
    if ( _id && _id[7].length === 11)
        _id = _id[7];
    const ret = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'contentDetails,statistics,snippet',
            id: _id,
            key: 'AIzaSyC94qNp2ScxdDjcw2wUEsauYsWBZrnvpkI'
        },
        method: 'GET'
    });
    console.log(ret);
    return(ret);
}

async function requestGitHub() {
    const ret = await axios.get('')
}

async function requestTwitch(username) {
    const helix = axios.create({
        baseURL: 'https://api.twitch.tv/helix/',
        headers: {'Client-ID': 'fbs5bzxbh3k6bz45rwgpldeke8tr0o'}
    });
    const ret = await helix.get('https://api.twitch.tv/helix/streams', {
        params: {
           user_login: username
        }
    });
    console.log(ret);
    return(ret);
}

const apis = {
    findWeather, requestYoutube, requestTwitch
};

export default apis;
