import React from 'react';
import apis from "../ConnectToOtherApi";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function YoutubeWidget() {

    const [videoData, setVideoData] = React.useState([]);

    const getYoutubeData = () => {
        let input = document.getElementById("video-input").value;
        apis.requestYoutube(input).then(res => {
            let tmpObj = [{
                channel: res.data.items[0].snippet.channelTitle,
                title: res.data.items[0].snippet.title,
                views: res.data.items[0].statistics.viewCount,
                likes: res.data.items[0].statistics.likeCount,
                dislikes: res.data.items[0].statistics.dislikeCount}];
            setVideoData(tmpObj);
        })
            .catch(err => {console.log(err)});
    };

    return (
        <div>
            <div>
                <TextField label={"Enter video URL"} id={"video-input"}/>
                <Button onClick={() => getYoutubeData()} >OK</Button>
            </div>
            <Divider/>
            <div>
                {videoData.map((item, index) => (
                    <div key={`video-${index}`}>
                        <Box display={'flex'} flexDirection={'row'}>
                            <div>
                                <Typography>{item.title}</Typography>
                                <Typography>{"Channel: " + item.channel}</Typography>
                                <Typography>{"Views: " + item.views}</Typography>
                                <Typography>{"Likes: " + item.likes}</Typography>
                                <Typography>{"Dislikes: " + item.dislikes}</Typography>
                            </div>
                        </Box>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YoutubeWidget;