import React from 'react';
import {useSwipeable} from "react-swipeable";
import {config} from "./config";

const Swipes = ({callback, state, ...props}) => {
    const swipeOpen = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === 'Right' && !state) callback(true);
        },
        ...config,
    });
    return (
        <div {...props} {...swipeOpen}>
        </div>
    );
};

export default Swipes;