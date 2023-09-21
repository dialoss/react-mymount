import React from 'react';
import './Modal.scss';

const Modal = ({content, isOpened, closeCallback}) => {
    const modalWin = React.createRef();

    return (
        <div className={"modal"}>
            <div className={"modal__wrapper " + (isOpened ? "opened" : "")}>
                <div className={"modal__background"} style={content.props.style.background}
                     onClick={(event) => {
                         event.stopPropagation();
                         closeCallback();
                     }}>
                </div>
                <div className="modal__window">
                    <div className="modal__content" ref={modalWin}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;