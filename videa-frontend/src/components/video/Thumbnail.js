import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Length from "./Length.js";

const Thumbnail = ({ source, Id, VidLength }) => {
    const [thumbnailSrc, setThumbnailSrc] = useState("");
    const [id, setId] = useState("");
    const [vidLength, setVidLength] = useState("");

    useEffect(() => {
        setThumbnailSrc(source);
        setId(Id);
        setVidLength(VidLength);
    }, []);

    return thumbnailSrc ? (
        <div className="video-thumbnail-box">
            <Link to={"/video/" + id} className="videa-link">
                <div className="video-hover-popup flex center">
                    <img src="https://i.ibb.co/C80TTHw/videa-Play.png" alt="videa-Play" border="0" className="video-hover-popup-image" />
                </div>
                <img src={thumbnailSrc} className="video-thumbnail"></img>
            </Link>
            <Length vidLength={vidLength}/>
        </div>
    ) : (
        <div className="video-thumbnail-box">
            <img src="https://i.ibb.co/SR3vQR0/no-Thumbnail.png" className="video-thumbnail"></img>
        </div>
    );
}

export default Thumbnail;