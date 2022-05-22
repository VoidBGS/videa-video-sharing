import axios from 'axios';
import React, { useState } from 'react';

const UploadVideoButton = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [video, setVideo] = useState({ link: "", title: "", thumbnail: ""});

    const handleClick = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked)
    }

    const handleChange = (event) => {
        setVideo({ ...video, [event.target.name]: event.target.value });
    };

    const handleVideoSubmit = (e) => {
        e.preventDefault();
        let form = { title: video.title, length: "13:37", thumbnail: video.thumbnail, author: "someDev", url: video.link };

        axios.post(process.env.REACT_APP_VIDEOS_SERVICE, form)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    setIsClicked(false);
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log("Error encountered when submitting vid: " + error);
                setIsClicked(false);
            })
    }

    const cleanUrl = (url) => {
        //replace the watch part
        let urlEmbed = url.replace("watch?v=", "embed/");
        //replace the params
        let cleanedURL = urlEmbed.split("&")[0];

        return cleanedURL;
    }

    return (
        <>
            <div className='searchbar-image-box mr-1 flex center' onClick={handleClick} data-testid="video-page-upload-video-button">
                <img src="https://i.ibb.co/pRSSBQ5/icons8-add-24.png" alt="Plus sign inside a black circle" className='searchbar-image'></img>
            </div>
            {isClicked ?
                <div className='videa-create-video-modal-bg flex center' data-testid="create-video-modal">
                    <div className='videa-create-video-modal'>
                        <form className='videa-form p-3' onSubmit={handleVideoSubmit}>
                            <h2 className='videa-form-title color-white pb-2'>Videa Upload</h2>
                            <div className='p-3'>
                                {/* <label className='videa-textbox-label' for="link">Link</label> */}
                                <input className='videa-textbox p-2' type="url" onChange={handleChange} required name="link" placeholder='Video link' data-testid="video-link-textbox"></input>
                            </div>
                            <div className='p-3'>
                                {/* <label className='videa-textbox-label' for="title">Title</label> */}
                                <input className='videa-textbox p-2' type="text" onChange={handleChange} minLength="3" maxLength="60" required name="title" placeholder='Video title' data-testid="video-title-textbox"></input>
                            </div>
                            <div className='p-3'>
                                {/* <label className='videa-textbox-label' for="title">Title</label> */}
                                <input className='videa-textbox p-2' type="url" onChange={handleChange} required name="thumbnail" placeholder='Link to Thumbnail Image' data-testid="video-thumbnail-textbox"></input>
                            </div>
                            <div className='p-3'>
                                <input className='videa-button p-3' type="submit" value="Upload" data-testid="video-submit-button"></input>
                            </div>
                        </form>
                    </div>
                </div> : ""}
        </>
    );
}

export default UploadVideoButton;