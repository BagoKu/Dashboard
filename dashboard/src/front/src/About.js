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
                host: 'IP'
            },
            server: {
                current_time: (new Date().getTime() / 1000).toFixed(0),
                services: [{
                    name: 'Dashboard1'
                }, {
                    name: 'Dashboard2'
                }]
            }});

    return(
        <div>
            <p>{JSON.stringify(about)}</p>
        </div>
    )
}

export default About;