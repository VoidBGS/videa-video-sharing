import React, {useState, useEffect} from "react";
import ImageBox from '../ImageBox/ImageBox';

const Author = ({Author}) => {
    const[author, setAuthor] = useState({});

    useEffect(()=>{
        setAuthor(Author);
    },[]);

    return author ? (
        <div className="author-profile">
            <ImageBox info={{src:author.profilePicSrc, isProfile: true, name:author.name}}/>
        </div>
    ) : "";
}

export default Author;