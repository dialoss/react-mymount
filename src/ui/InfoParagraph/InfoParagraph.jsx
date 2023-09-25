import React, {useCallback, useEffect, useRef} from 'react';
import "./InfoParagraph.scss";
import {triggerEvent} from "helpers/events";

const InfoParagraph = ({type, children, ...props}) => {
    const ref = useRef();
    const editorCallback = useCallback((event) => {
        if (event.detail === 2) {
            triggerEvent('toggle-editor', {
                event,
                simple: (type !== "textfield"),
                isOpened: true,
                props,
                value: ref.current.innerHTML,
                element: ref.current});
            ref.current.style.width = Math.max(300, ref.current.clientWidth + 50) + "px";
        }
    }, []);
    useEffect(() => {
        ref.current.innerHTML = children;
    }, [children]);
    return (
        <span ref={ref} {...props} onClick={editorCallback} key={type}
           className={`info__paragraph info__paragraph-${type}`}></span>
    );
};

export default InfoParagraph;