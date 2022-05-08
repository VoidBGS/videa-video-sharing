import React,{useState, useEffect} from "react";
import Author from "./Author";
import Title from "./Title";
import UploadedOn from "./UploadedOn";
import Views from "./Views";
import "./video.css";
import Thumbnail from "./Thumbnail";

const VideoBox = ({Video}) => {
    const [source, setSource] = useState("");
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    const [author, setAuthor] = useState({});

    useEffect(()=>{
        setSource(Video.thumbnail);
        setTitle(Video.title);
        setId(Video.id);
        setAuthor(Video.author);
    },[author, source, title, id]);

    return source && title && id ? (
        <div className="videa-video-container mx-1">
            <div className="videa-video-box">
                <Thumbnail source={source} Id={id} VidLength={Video.length}/>
                <div className="flex p-1">
                    <Author Author={author}/>
                    <Title info={{ name: title, id: id }} />
                </div>
                <div className="video-likes-views-box flex w-full">
                    <Views />
                    <UploadedOn />
                </div>
            </div>
        </div>
    ) : "Error";
}

export default VideoBox;