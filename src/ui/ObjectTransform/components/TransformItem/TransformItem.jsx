import React, {useEffect, useRef} from 'react';
import {triggerEvent} from "helpers/events";
import {setItemTransform} from "../../transform";

const TransformItem = ({children}) => {
    const ref = useRef();
    useEffect(() => {
        // ref.current.addEventListener("mousedown", (event) =>
            // setItemTransform(event, ))

        // ref.current.addEventListener("mousedown", () => triggerEvent("transform-item", {item:ref.current}));
    }, []);
    return (
        <div className={"transform-item"} ref={ref}>
            {children}
        </div>
    );
};

export default TransformItem;