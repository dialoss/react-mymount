import React, {useEffect, useRef} from 'react';
import './Modal.scss';
import {getCorrectedPosition} from "../helpers/viewport";

const Modal = ({content, isOpened, closeCallback}) => {
    const ref = useRef();
    useEffect(() => {
        const [px, py] = getCorrectedPosition(ref.current);
        if (ref.current.style.top !== '') {
            ref.current.style.left = px + "px";
            ref.current.style.top = py + "px";
        }
    }, [content]);
    const opened = (isOpened ? "opened" : "");
    return (
        <div className={"modal"}>
            <div className={"modal__wrapper"}>
                <div className={`modal__background ${opened} ${(content?content.props.style:'')}`}
                     onClick={(event) => {
                         event.stopPropagation();
                         closeCallback();
                     }}>
                </div>
                <div className={"modal__window " + opened}
                     style={content.props.position||{}} ref={ref}>
                    <div className="modal__content">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;