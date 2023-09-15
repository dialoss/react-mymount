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
            fields: {
                data: {},
            },
        },
        {
            name: 'context',
            content: <ContextMenu/>,
            style: {
                bg: {
                    backgroundColor: "rgba(0,0,0,0)"
                },
                win: {
                    position: "fixed"
                }
            },
            fields: {},
        },
        {
            name: 'carousel',
            content: <Carousel/>,
            style: {},
            fields: {
                currentImage: 0,
                imageList: []
            },
        }
    ]

    const dispatch = useDispatch();

    useKeypress('Escape', (event) => {
        if (event.target.classList.contains("picker")) return;
        closeAllModals();
    });

    return (
        <div className={"modal-manager"}>
            {
                modals.map((modal, index) => {
                    dispatch(actions.addModal(modal.name));
                    changeModal(modal.name, modal.fields);
                    return <Modal modal={modal} key={index}></Modal>
                })
            }
        </div>
    );
}

export default ModalManager;