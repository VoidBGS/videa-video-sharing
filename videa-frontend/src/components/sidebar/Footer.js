import React from 'react';
import ImageBox from '../ImageBox/ImageBox';

const Footer = () => {
    return (
        <div className='videa-footer w-full'>
            <div className='videa-footer-socials flex w-full evenly'>
                <a href="https://www.linkedin.com/in/kristian-lachev-6087a6215" className='videa-link' target="https://www.linkedin.com/in/kristian-lachev-6087a6215/">
                    <ImageBox info={{src: "https://i.ibb.co/RcLv2sD/icons8-linkedin-24-1.png", alt:"The LinkedIn Social"}}/>
                </a>
                <a href="https://github.com/VoidBGS" className='videa-link' target="https://github.com/VoidBGS">
                    <ImageBox info={{src: "https://i.ibb.co/SfPLXPz/icons8-github-24-1.png", alt:"The Github Social"}}/>
                </a>
                <a href="mailto:43061@student.fontys.nl" className='videa-link'>
                    <ImageBox info={{src: "https://i.ibb.co/X49wLJc/icons8-email-send-24.png", alt:"Email me button"}}/>
                </a>
            </div>
            <div className='videa-footer-desc flex evenly w-full'>
                <div>
                    <a href="https://fontys.edu" className='videa-link color-dark' target="https://fontys.edu">
                        University
                    </a>
                </div>
                <div>
                    <a href="https://csgostats.gg/player/76561198114893314#/matches" className='videa-link color-dark' target="https://csgostats.gg/player/76561198114893314#/matches">
                        About me
                    </a>
                </div>
                <div className='copyright'>
                    Videa &copy; 2022
                </div>
            </div>
        </div>
    )
}

export default Footer;