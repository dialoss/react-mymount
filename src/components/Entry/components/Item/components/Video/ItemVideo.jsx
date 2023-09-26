import React from 'react';
import "./ItemVideo.scss";

const ItemVideo = ({data}) => {
    return (
        <video className="item__video" preload="metadata" id="player"
               playsInline controls>
            <source src={data.url} type="video/mp4"/>
        </video>
    );
};

export default ItemVideo;