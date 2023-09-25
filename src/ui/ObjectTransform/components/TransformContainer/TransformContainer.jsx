import React from 'react';
import {initContainerHeight} from "../../helpers";
import {useAddEvent} from "../../../../hooks/useAddEvent";

const TransformContainer = ({children}) => {
    function container(event) {
        initContainerHeight(event.detail);
    }
    useAddEvent("init-container", container);
    return (
        <div className={"transform-container"}>
            {children}
        </div>
    );
};

export default TransformContainer;