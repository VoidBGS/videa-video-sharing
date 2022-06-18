import React, { useState, useEffect } from 'react';
import VideoBox from '../../components/video/VideoBox';
import axios from "axios";
import "./homepage.css";
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {

    const [videos, setVideos] = useState([]);
    const [rows, setRows] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        let URL = "";
        const TOKEN = await getAccessTokenSilently();;

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.JEST_WORKER_ID) {
            URL = process.env.REACT_APP_VIDEOS_SERVICE_TESTING;
        } else {
            URL = process.env.REACT_APP_VIDEOS_SERVICE;
        }
        if (URL !== "") {
            await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }).then(function (response) {
                setVideos(response.data);
                seperateRows(response.data);
            }).catch(function (error) {
                console.log("An error occured when connecting to the video service. Error " + error);
            })
        }
        else {
            console.log("Env file undefined");
        }
    }

    const seperateRows = (rowsArray) => {
        var perChunk = 3 // items per chunk    

        var inputArray = rowsArray;
        if (inputArray.length > 0) {
            var result = inputArray.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / perChunk);

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                }

                resultArray[chunkIndex].push(item);

                return resultArray;
            }, [])
            console.log(result);

            setRows(result);
        }
    }

    return videos.length !== 0 ? (
        <div className='videa-homepage w-full' data-testid="homepage-main">
            {
                rows.map(row => (
                    <div className='flex w-full wrap' key={row}>
                        {row.map(vid => (
                            <VideoBox Video={vid} key={vid.id} />
                        ))}
                    </div>
                ))
            }
        </div>
    ) : (
        <div data-testid="video-page-main">
            Video Service is not responding or there are no videos
        </div>
    );
}

export default Homepage;