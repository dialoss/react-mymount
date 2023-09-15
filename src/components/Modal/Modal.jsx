import React, {useEffect} from 'react';
import 'styles/modal/Modal.scss';
import {useSelector} from "react-redux";
import {changeModal} from "components/Modal/changeModal";
import {correctElementPosition} from "scripts/utils/correctElementPosition";

const Modal = ({modal}) => {
    const modalState = useSelector(state => state.modal[modal.name]);
    const isOpened = modalState.isOpened;
    const position = modalState.position;

    const modalWin = React.createRef();

    useEffect(() => {
        changeModal(modal.name, correctElementPosition(modalState.position, modalWin));
    }, [position]);

    return (
        <div className={"modal modal-" + modal.name}>
            <div className={"modal__wrapper " + (isOpened ? "opened" : "")}>
                <div className={"modal__background"} style={modal.style.bg}
                     onClick={(event) => {
                         event.stopPropagation();
                         changeModal(modal.name, {isOpened: false});
                     }}>
                </div>
                <div className="modal__window" style={{...position, ...modal.style.win}}>
                    <div className="modal__content" ref={modalWin}>
                        {modal.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;