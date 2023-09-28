import React from 'react';
import {initContainerHeight} from "../../helpers";
import {useAddEvent} from "hooks/useAddEvent";

const TransformContainer = ({children}) => {
    function initContainer(event) {
        initContainerHeight(event.detail);
    }

    useAddEvent("container:init", initContainer);
    return (
        <div className={"transform-container"}>
            {children}
        </div>
    );
};

export default TransformContainer;