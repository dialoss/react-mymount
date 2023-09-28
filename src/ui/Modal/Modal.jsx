import React, {useEffect} from 'react';
import './Modal.scss';
import {correctElementPosition} from "../helpers/viewport";

const Modal = ({content, isOpened, closeCallback}) => {
    useEffect(() => {
        // console.log(content)
        // correctElementPosition(ref.current);
    }, [content]);

    return (
        <div className={"modal"}>
            <div className={"modal__wrapper " + (isOpened ? "opened" : "")}>
                <div className={"modal__background"} style={!!content?content.props.style:{}}
                     onClick={(event) => {
                         event.stopPropagation();
                         closeCallback();
                     }}>
                </div>
                <div className="modal__window" style={content.props.position||{}}>
                    <div className="modal__content">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;