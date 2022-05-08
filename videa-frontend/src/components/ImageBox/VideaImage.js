import React from 'react';
import "./imageBox.css";

const ImageBox = ({info}) =>{
    return info ? (
        <img src={info.src} alt={info.alt} className='videa-circular-image'></img>

    ) : <img src="https://i.ibb.co/Rbxm3sb/user-Icon-MINE.png" alt="Error" border="0"/>
}

export default ImageBox;