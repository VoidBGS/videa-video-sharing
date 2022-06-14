import axios from 'axios';
import * as ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MainVideo from './MainVideo';
import SuggestedVideos from './SuggestedVideos';
import { useAuth0 } from "@auth0/auth0-react";

const VideoPage = () => {
    const { isAuthenticated } = useAuth0();
    const [video, setVideo] = useState({});
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getVideoById();
        getLikesByVideoId();
    }, []);

    const getVideoById = () => {
        if (!isAuthenticated) {
            console.error("Unauthorized request detected!");
            return;
        }
        setIsLoading(true);
        axios.get(process.env.REACT_APP_VIDEOS_SERVICE + id)
            .then(function (response) {
                setIsLoading(false);
                setVideo(response.data);
                setError(false);
            })
            .catch(function (error) {
                console.log("navigate away");
                setIsLoading(false);
                setError(true);
            });
    }

    const getLikesByVideoId = () => {
        if (!isAuthenticated) {
            console.error("Unauthorized request detected!");
            return;
        }
        axios.get(process.env.REACT_APP_LIKES_SERVICE + id)
            .then(function (response) {
                setLikes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        isLoading ? (
            <div className='loader-wrap'>
                <div className='loader'></div>
            </div>
        ) : (
            <div className='video-page flex between w-full' data-testid="video-page-main">
            {
                error ? <Navigate to="/404" replace={true} /> : ""
            }

            {
                video ? <MainVideo video={video} likes={likes} getLikesById={getLikesByVideoId} /> : <MainVideo />
            }
            <SuggestedVideos />
        </div>
        )

    );
}

export default VideoPage;