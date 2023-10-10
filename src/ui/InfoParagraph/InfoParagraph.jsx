import React, {useCallback, useEffect, useRef} from 'react';
import "./InfoParagraph.scss";
import {doubleTap, isTouchDevice, triggerEvent} from "helpers/events";

const InfoParagraph = ({type, children, ...props}) => {
    const ref = useRef();
    const editorCallback = (event) => {
        // console.log('31')
        // doubleTap((event) => {
        if (event.detail !== 2) return;
            console.log(5)
            triggerEvent('text-editor:toggle', {
                event,
                simple: (type !== "textfield"),
                isOpened: true,
                props,
                value: ref.current.innerHTML,
                element: ref.current});
            ref.current.style.width = Math.max(300, ref.current.clientWidth + 50) + "px";
        // });
    }
    useEffect(() => {
        ref.current.innerHTML = children;
    }, [children]);
    // const callback = isTouchDevice() ? {onTouchEnd: editorCallback} : {onMouseDown: editorCallback};
    return (
        <span ref={ref} {...props} key={type}
            onClick={editorCallback}
           className={`info__paragraph info__paragraph-${type}`}></span>
    );
};

export default InfoParagraph;