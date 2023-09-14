import React from 'react';
import useKeypress from "react-use-keypress";
import Modal from "./Modal";
import MyForm from "../MyForm/MyForm";
import {useDispatch} from "react-redux";
import {actions} from "store/reducers/modal";
import {changeModal, closeAllModals} from "components/Modal/changeModal";
import ContextMenu from "components/ContextMenu/ContextMenu";
import Carousel from "../Carousel/Carousel";

const ModalManager = () => {
    const modals = [
        {
            name: 'form',
            content: <MyForm/>,
            style: {},
        },
        {
            name: 'context',
            content: <ContextMenu/>,
            style: {
                bg: {
                    backgroundColor: "rgba(0,0,0,0)",
                },
                win: {
                    transform: "translate(0,0)"
                }
            },
        },
        {
            name: 'carousel',
            content: <Carousel/>,
            style: {},
        }
    ]

    const dispatch = useDispatch();

    useKeypress('Escape', (event) => {
        closeAllModals();
    });

    return (
        <div className={"modal-manager"}>
            {
                modals.map((modal, index) => {
                    dispatch(actions.addModal(modal.name));
                    return <Modal modal={modal} key={index}></Modal>
                })
            }
        </div>
    );
}

export default ModalManager;