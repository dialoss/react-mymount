import React from 'react';
import './Modal.scss';

const Modal = ({content, isOpened, closeCallback}) => {
    return (
        <div className={"modal"}>
            <div className={"modal__wrapper " + (isOpened ? "opened" : "")}>
                <div className={"modal__background"} style={!!content?content.props.style:{}}
                     onClick={(event) => {
                         event.stopPropagation();
                         closeCallback();
                     }}>
                </div>
                <div className="modal__window">
                    <div className="modal__content">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;