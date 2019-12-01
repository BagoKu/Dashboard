import React from 'react';
import apis from "../ConnectToOtherApi";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

function YoutubeWidget() {

    const [videoData, setVideoData] = React.useState([]);

    const getYoutubeData = () => {
        apis.requestYoutube("https://www.youtube.com/watch?v=xBjXBNBdU9c").then(res => {
            let tmpObj = [{
                channel: res.data.items[0].snippet.channelTitle,
                title: res.data.items[0].snippet.title,
                views: res.data.items[0].contentDetails.viewCount,
                likes: res.data.items[0].contentDetails.likeCount,
                dislikes: res.data.items[0].contentDetails.dislikeCount}];
            setVideoData(tmpObj);
        });
    };

    return (
        <div>
            <div>
                <TextField id={"city-input"}/>
                <Button onClick={() => getYoutubeData()} >OK</Button>
            </div>
            <Divider/>
            <div>
                {videoData.map((item, index) => (
                    <div key={`video-${index}`}>
                        <Typography>{item.title}</Typography>
                        <Typography>{item.channel}</Typography>
                        <Typography>{item.views}</Typography>
                        <Typography>{item.likes}</Typography>
                        <Typography>{item.dislikes}</Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YoutubeWidget;