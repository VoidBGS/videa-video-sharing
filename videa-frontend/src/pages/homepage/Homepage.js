import React, { useState, useEffect } from 'react';
import VideoBox from '../../components/video/VideoBox';
import axios from "axios";
import "./homepage.css";

const Homepage = () => {

    const [videos, setVideos] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = () => {
        const URL = process.env.REACT_APP_VIDEOS_SERVICE;
        console.log(URL);
        if (URL !== "") {
            axios.get(URL).then(function (response) {
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
        var perChunk = 4 // items per chunk    

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
        <div className='videa-homepage w-full'>
            {
                rows.map(row => (
                    <div className='flex w-full wrap'>
                        {row.map(vid => (
                            <VideoBox Video={vid} key={vid.id} />
                        ))}
                    </div>
                ))
            }
        </div>
    ) : (
        <div>
            Video Service is not responding or there are no videos
        </div>
    );
}

export default Homepage;