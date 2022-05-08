import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MainVideo from './MainVideo';
import SuggestedVideos from './SuggestedVideos';

const VideoPage = () => {
    const [video, setVideo] = useState({});
    const [likes, setLikes] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        getVideoById();
        getLikesByVideoId();
    },[]);

    const getVideoById = () =>{
        axios.get(process.env.REACT_APP_VIDEOS_SERVICE + id)
        .then(function(response){
            setVideo(response.data);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const getLikesByVideoId = () => {
        axios.get(process.env.REACT_APP_LIKES_SERVICE + id)
        .then(function(response){
            setLikes(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return (
        <div className='video-page flex between w-full'>
            {
                video ? <MainVideo video={video} likes={likes} getLikesById={getLikesByVideoId}/> :<MainVideo/>
            }
            
            <SuggestedVideos/>
        </div>
    );
}

export default VideoPage;