import axios from 'axios';
import React,{useState, useEffect} from 'react';
import "./videopage.css";
import { useParams } from 'react-router-dom';

const MainVideo = ({ video, likes, getLikesById }) => {

    const [like, setLike] = useState(0);
    const { id } = useParams();

    useEffect(()=>{
        setLike(like)
    },[like]);

    const handleClick = (e) =>{
        e.preventDefault();
        console.log("Vid id: " + id);
        let form = {videoId: id};
        axios.post(process.env.REACT_APP_LIKES_SERVICE, form)
        .then(function(response){
            console.log(response);
            getLikesById();
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return (
        <div className='main-video-box w-full p-2 mr-1'>
            <div className='main-video-player'>
                <iframe width="1280" height="720"
                    src={video.url}>
                </iframe>
            </div>
            <div className='main-video-title p-1'>
                {video.title}
            </div>

            <div className='main-video-info flex between v-center p-1'>
                <div className='main-video-statistics flex'>
                    <div className='mr-1'>
                        1337 Views
                    </div>
                    <div>
                        03.04.2022
                    </div>
                </div>
                <div className='main-video-likes flex' onClick={handleClick}>
                    <div className='main-video-like-button flex center'>
                        I Like this | {likes} &hearts;
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainVideo;