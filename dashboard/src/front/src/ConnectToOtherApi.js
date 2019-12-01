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

async function requestWikipedia(search) {
    const ret = await axios.get('http://fr.wikipedia.org/w/api.php?action=opensearch&search=' + search);

    return(ret);
}

async function requestMoviedb(movieTitle) {
    const ret = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: "8be7dd08031e2ad3dd83bed9db873720",
            language: "fr",
            query: movieTitle
        },
        method: 'GET'
    });

    return(ret);
}

async function requestNews(article) {
    const ret = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            apiKey: '6571068712ea46dca5e0dcd0173c354f',
            q: article,
            sortBy: 'popularity',
            language: 'fr'
        },
        method: 'GET'
    });

    return(ret);
}

const apis = {
    findWeather, requestYoutube, requestTwitch, requestWikipedia, requestMoviedb, requestNews
};

export default apis;
