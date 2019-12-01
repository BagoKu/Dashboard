import React from 'react'
import user from "./ConnectToApi";

function About() {

    React.useEffect(() => {
        async function getData() {
            const bdd = await user.getBDD();
            setData(bdd);
        }
        getData();
    }, []);

    const [data, setData] = React.useState([]);
    const [about, setAbout] = React.useState(
        {
            client: {
                host: 'ID'
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
            }});

    return(
        <div>
            <p>{JSON.stringify(about)}</p>
        </div>
    )
}

export default About;
