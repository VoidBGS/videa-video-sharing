import axios from 'axios';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UploadVideoButton = () => {
    const { isAuthenticated } = useAuth0();
    const [isClicked, setIsClicked] = useState(false);
    const [video, setVideo] = useState({ link: "", title: "", thumbnail: "" });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setVideo({ ...video, [e.target.name]: e.target.value });
    };

    const handleModalClick = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);
        window.location.reload();
    }

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        if(!isAuthenticated && typeof(process.env.JEST_WORKER_ID) == undefined){
            console.error("Unauthorized submit detected.");
            return;
        }
        setIsLoading(true);
        let form = { title: video.title, length: "13:37", thumbnail: video.thumbnail, author: "someDev", url: video.link };

        try {
            let URL = "";
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.JEST_WORKER_ID) {
                URL = process.env.REACT_APP_VIDEOS_SERVICE_TESTING;
            } else {
                URL = process.env.REACT_APP_VIDEOS_SERVICE;
            }
            console.log("posting video to " + URL);
            axios.post(URL, form, {
                timeout: 2500,
            })
                .then(function (response) {
                    console.log("Video has been posted");
                    if (response.status === 201) {
                        setIsLoading(false);
                        setIsClicked(false);
                        setIsSuccess(true);
                    }
                })
                .catch(function (error) {
                    console.error("Error encountered when submitting vid: " + error);
                    setIsLoading(false);
                    setIsError(true);
                    setIsClicked(false);
                })
        } catch (error) {
            console.error("Posting video failed");
            console.error(error);
        }
    }

    // const cleanUrl = (url) => {
    //     //replace the watch part
    //     let urlEmbed = url.replace("watch?v=", "embed/");
    //     //replace the params
    //     let cleanedURL = urlEmbed.split("&")[0];

    //     return cleanedURL;
    // }

    return (
        <>
            <div className='searchbar-image-box mr-1 flex center' onClick={handleClick} data-testid="video-page-upload-video-button">
                <img src="https://i.ibb.co/pRSSBQ5/icons8-add-24.png" alt="Plus sign inside a black circle" className='searchbar-image'></img>
            </div>
            {isClicked ?
                <div className='videa-create-video-modal-bg flex center' data-testid="create-video-modal">
                    <div className='videa-create-video-modal'>
                    {!isLoading ?
                        <form className='videa-form p-3' onSubmit={handleVideoSubmit} data-testid="video-page-upload-video-form">
                                    <h2 className='videa-form-title color-white pb-2'>Videa Upload</h2>
                                    <span className='videa-form-close' onClick={handleClick}>Close</span>
                                    <div className='videa-textbox-wrap p-3'>
                                        {/* <label className='videa-textbox-label' for="link">Link</label> */}
                                        <input className='videa-textbox pt-2 pb-2' type="url" onChange={handleChange} required name="link" placeholder='Video link' data-testid="video-link-textbox"></input>
                                    </div>
                                    <div className='videa-textbox-wrap p-3'>
                                        {/* <label className='videa-textbox-label' for="title">Title</label> */}
                                        <input className='videa-textbox pt-2 pb-2' type="text" onChange={handleChange} minLength="3" maxLength="60" required name="title" placeholder='Video title' data-testid="video-title-textbox"></input>
                                    </div>
                                    <div className='videa-textbox-wrap p-3'>
                                        {/* <label className='videa-textbox-label' for="title">Title</label> */}
                                        <input className='videa-textbox pt-2 pb-2' type="url" onChange={handleChange} required name="thumbnail" placeholder='Link to Thumbnail Image' data-testid="video-thumbnail-textbox"></input>
                                    </div>
                                    <div className='videa-textbox-wrap p-3'>
                                        <input className='videa-button p-3' type="submit" value="Upload" data-testid="video-submit-button"></input>
                                    </div>
                        </form>
                        : <div className="loader"></div>}
                    </div>
                </div> : ""}

            {isSuccess ?
                <div className='videa-post-modal' onClick={handleModalClick}>
                    Video has been posted successfully!
                </div>
                : ""}

            {isError ?
                <div className='videa-post-modal' onClick={handleModalClick}>
                    An error has been encountered during the request! Please try again.
                </div>
                : ""}
        </>
    );
}

export default UploadVideoButton;