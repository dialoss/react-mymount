import React, {useEffect, useRef, useState} from 'react';
import './Modal.scss';
import {getCorrectedPosition} from "../helpers/viewport";
import {useAddEvent} from "../../hooks/useAddEvent";
import {getElementFromCursor} from "../../helpers/events";

const Modal = ({content, isOpened, closeCallback}) => {
    const ref = useRef();
    const opRef = useRef();
    opRef.current = isOpened;
    const [contentOuter, setContentOuter] = useState('');
    const windowRef = useRef();
    useEffect(() => {
        let pos = content.props.position;
        if (!pos) return;
        let [px, py] = [pos.left, pos.top];
        [px, py] = getCorrectedPosition(ref.current, [px, py]);
        ref.current.style.left = px + "px";
        ref.current.style.top = py + "px";
    }, [content]);

    useEffect(() => {
        let outer = windowRef.current.querySelector('.content-outer');
        if (outer) {
            setContentOuter(outer.innerHTML);
        }
    }, [content]);

    function checkBackgroundClick(event) {
        let el = getElementFromCursor(event, 'modal__window');
        if (!el && opRef.current) closeCallback();
    }
    const props = content.props.style;
    useAddEvent("click", checkBackgroundClick);
    const opened = (isOpened ? "opened" : "");
    return (
        <div className={"modal"} ref={windowRef}>
            <div className={"modal__wrapper"}>
                <div className={`modal__background ${opened} ${!!props && (props.bg || '')}`}>
                </div>
                <div className={`modal__window ${opened} ${!!props && ((props.win || '') + ' ' + (props.bg || ''))}`} ref={ref}>
                    <div className="modal__content">
                        {content}
                    </div>
                </div>
                <div className={`modal__outer modal__window ${opened}`} dangerouslySetInnerHTML={{__html: contentOuter}}>
                </div>
            </div>
        </div>
    );
};

export default Modal;