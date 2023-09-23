import React, {useRef} from 'react';
import {triggerEvent} from "helpers/events";

const TransformButton = ({children, type, ...props}) => {
    const ref = useRef();
    function transformCallback(event) {
        event.stopPropagation();
        if (event.button !== 0) return;
        triggerEvent("transform-item", {event, type, btn:ref.current});
    }
    return (
        <div {...props} ref={ref} onMouseDown={transformCallback}>
            {children}
        </div>
    );
};

export default TransformButton;