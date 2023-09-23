import React, {useEffect} from 'react';
import {useAddEvent} from "hooks/useAddEvent";

const TransformContainer = ({children}) => {
    useEffect(() => {
        console.log(children.ref.current);
    }, [])

    function transformCallback(event) {
        console.log(event.detail.item);
    }

    useAddEvent("transform-item", transformCallback)

    return (
        <>
            {children}
        </>
    );
};

export default TransformContainer;