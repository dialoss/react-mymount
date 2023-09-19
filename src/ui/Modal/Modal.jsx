import React from 'react';
import './Modal.scss';

const Modal = ({content, isOpened, closeCallback}) => {
    const modalWin = React.createRef();

    return (
        <div className={"modal modal-" + content.name}>
            <div className={"modal__wrapper " + (isOpened ? "opened" : "")}>
                <div className={"modal__background"} style={content.style.bg}
                     onClick={(event) => {
                         event.stopPropagation();
                         closeCallback();
                     }}>
                </div>
                <div className="modal__window" style={content.style.win}>
                    <div className="modal__content" ref={modalWin}>
                        {content.data}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;