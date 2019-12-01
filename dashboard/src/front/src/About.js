import React from 'react'

function About() {

    const [data, setData] = React.useState([]);
    React.useEffect(() => {
       async function getIpAddr() {
           const publicIp = require('public-ip');
           publicIp.v4().then(res => {
               let about = [{
                   client: {
                       host: res
                   },
                   server: {
                       current_time: (new Date().getTime() / 1000).toFixed(0),
                       services: [{
                           name: 'weather',
                           widgets: [{
                               name: "weather",
                               description: "Display temperature for a city",
                               params: [{
                                   name: "city",
                                   type: "string"
                               }]
                           }]
                       }, {
                           name: 'youtube',
                           widgets: [{
                               name: "youtube",
                               description: "Display information for a video youtube with an url",
                               params: [{
                                   name: "url",
                                   type: "string"
                               }]
                           }]
                       }, {
                           name: 'twitch',
                           widgets: [{
                               name: "twitch",
                               description: "Display information about a streamer",
                               widgets: [{
                                   name: "streamer",
                                   type: "string"
                               }]
                           }]
                       }, {
                           name: 'wikipedia',
                           widgets: [{
                               name: "wikipedia",
                               description: "Display url for the page linked to data",
                               widgets: [{
                                   name: "data",
                                   type: "string"
                               }]
                           }]
                       }, {
                           name: 'movies',
                           widgets: [{
                               name: "movies",
                               description: "Display information for the movies",
                               widgets: [{
                                   name: "movie",
                                   type: "string"
                               }]
                           }]
                       }, {
                           name: 'news',
                           widgets: [{
                               name: 'news',
                               description: "Display the best news for the subject you ask",
                               widgets: [{
                                   name: "subject",
                                   type: "string"
                               }]
                           }]
                       }]
                   }}];
               setData(about);
           });
       }
        getIpAddr();
    }, []);
    return(
        <div>
            <p>{data.map(item => (
                JSON.stringify(item)
            ))}</p>
        </div>
    )
}

export default About;
