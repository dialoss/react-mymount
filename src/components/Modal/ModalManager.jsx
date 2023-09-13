import React from 'react';
import useKeypress from "react-use-keypress";
import Modal from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/modal";

let dispatch = null;

export function openModal() {
    dispatch(actions.toggleModal(true));
}

export function closeModal() {
    dispatch(actions.toggleModal(false));
}

const ModalManager = ({content}) => {
    const modalOpened = useSelector((state) => state.modal.modalOpened);
    dispatch = useDispatch();

    useKeypress('Escape', () => {
        closeModal();
    });

    return (
        <Modal modalStyles={content.style} closeModal={closeModal} opened={modalOpened}>{content.data}</Modal>
    );
};

export default ModalManager;
