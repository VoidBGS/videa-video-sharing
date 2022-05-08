import React from 'react';
import VideaImage from "./VideaImage";
import VideaProfile from './VideaProfile';

const ImageBox = ({info}) =>{
    return info ? (
        info.isProfile ? (
            <div className='image-box-profile flex center'>
                <VideaProfile info={info}/>
            </div>
        ) : (
            <div className='image-box flex center'>
                <VideaImage info={info}/>
            </div>
        )
    ) : (
        <div className='image-box flex center'>
            <VideaImage/>
        </div>
    )
}

export default ImageBox;