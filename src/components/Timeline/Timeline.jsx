import React from 'react';
import "./Timeline.scss";
import Item from "./Item/Item";

const Timeline = ({stages, parent, ...props}) => {
    return (
        <div className={"timeline " + (props.className ? props.className : "")}>
            {
                stages.map((stage, index) => <Item parent={parent} data={{...stage, color: {
                    top: stages[index].color,
                            bottom: stages[Math.min(index + 1, stages.length - 1)].color}}} connector={index !== stages.length - 1} key={index}>
                </Item>
                )
            }
        </div>
    );
};

export default Timeline;