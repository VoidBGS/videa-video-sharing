import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {cropIfExceed} from "../../func/titleCrop";

const Title = ({ info }) => {
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    const allowedLength = 60;

    useEffect(() => {
        setTitle(info.name);
        setId(info.id);
    }, [title, id]);

    return title ? (
        <Link to={"video/" + id} className="videa-link-dark video-title">
            <div className="font-bold">
                {cropIfExceed(title, allowedLength)}
            </div>
        </Link>
    ) : (
        <div className="video-title font-bold">
            Title Not Found.
        </div>
    );
}

export default Title;