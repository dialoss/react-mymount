import React from 'react';
import ContextItem from "./ContextItem";
import {ContextActions, handleAction, setActionElement} from "./ContextActions";
import 'styles/modal/context/ContextMenu.scss';
import {changeModal} from "../Modal/changeModal";

const ContextMenu = () => {
    function handleMenu(action) {
        handleAction(action);
        changeModal('context', {isOpened: false});
    }

    window.addEventListener("contextmenu", event => {
        event.preventDefault();
        setActionElement(event);
        changeModal('context', {isOpened: true, position: {
                left: event.clientX, top: event.clientY}});
    });

    window.addEventListener("scroll", () => {
        changeModal('context', {isOpened: false});
    });

    return (
        <div className="context-menu">
            {
                Object.values(ContextActions).map((action, index) =>
                    <ContextItem callback={() => handleMenu(action)} name={action.name} key={index}></ContextItem>
                )
            }
        </div>
    );
};

export default ContextMenu;