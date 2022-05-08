import React from 'react';

const Length = ({ vidLength }) => {
    return vidLength ? (
        <div className='video-length p-1'>
            {vidLength}
        </div>
    ) : (
        <div className='video-length p-1'>
            13:37
        </div>
    );
}

export default Length;