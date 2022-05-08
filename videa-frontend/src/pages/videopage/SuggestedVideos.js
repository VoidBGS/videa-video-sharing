import React from 'react';
import VideoBox from '../../components/video/VideoBox';
import {cropIfExceed} from "../../func/titleCrop";

const SuggestedVideos = () => {

    var vid = {
        source: "https://i.ytimg.com/vi/5Z2mnqFYFV0/hq720.jpg",
        title: "Big Ounce SHRUNK Kevin!? ",
        link: "/video/1",
        author: { profilePicSrc: "https://yt3.ggpht.com/EjQqWihI9-49mjhDiLd3OJ1ixeyaqEPdKXhDaCncg5R-0Ym1-mKw92MEeFO2QTsVgH2pYnfPGw=s48-c-k-c0x00ffffff-no-rj", name: "Kevin & Uncle Ben Clips" }
    };

    var vid2 = {
        source: "https://i.ytimg.com/vi/iT-cYYgKSSE/hqdefault.jpg",
        title: "Making a Million Dollars from CS:GO's Economy - quickly.",
        link: "/video/2",
        author: { profilePicSrc: "https://yt3.ggpht.com/nwV6fXfAnrPwDv3IT6rBxnYE1GOvt0ioHFAEegHDpfVfRzDZQHPkQy6yIKDXMNw8gpOzgFX6yug=s48-c-k-c0x00ffffff-no-rj", name: "3kliksphilip" }
    };

    var vid3 = {
        source: "https://i.ytimg.com/vi/0xrC8vaddcg/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFp0wwmxhN-egqkQ6yDbgi4tG9vA",
        title: "World's Spinniest Table",
        link: "/video/3",
        author: { profilePicSrc: "https://yt3.ggpht.com/ytc/AKedOLQiZcSScNbGPna7N_GUs8ko8a7_emuWXJIZX6jEGg=s48-c-k-c0x00ffffff-no-rj", name: "Pongfinity" }
    }

    const allowedLength = 30;

    return (
        <div className='suggested-videos-box w-half pb-4'>
            <div className='suggested-video my-1'>
                <img src={vid.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
            <div className='suggested-video my-1'>
                <img src={vid2.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid2.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
            <div className='suggested-video my-1'>
                <img src={vid3.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid3.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
            <div className='suggested-video my-1'>
                <img src={vid.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
            <div className='suggested-video my-1'>
                <img src={vid2.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid2.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
            <div className='suggested-video my-1'>
                <img src={vid3.source} className="suggested-video-thumbnail"></img>
                <div className='suggested-video-title p-1'>{cropIfExceed(vid3.title, allowedLength)}</div>
                <div className='suggested-video-views'>1337 Views</div>
            </div>
        </div>
    );
}

export default SuggestedVideos;