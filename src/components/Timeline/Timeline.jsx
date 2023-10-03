import React from 'react';
import "./Timeline.scss";
import Item from "./Item/Item";

const Timeline = ({stages}) => {
    return (
        <div className={"timeline"}>
            {
                stages.map((stage, index) => {
                    return <Item type={stage.type} data={stage} connector={index !== stages.length - 1} key={index}></Item>
                })
            }
        </div>
    );
};

export default Timeline;