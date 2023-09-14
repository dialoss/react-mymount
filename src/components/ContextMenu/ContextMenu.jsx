import React from 'react';
import ContextItem from "./ContextItem";
import {ContextActions} from "./ContextActions";
import 'styles/modal/context/ContextMenu.scss';
import {changeModal} from "../Modal/changeModal";

const ContextMenu = () => {
    function handleMenu(action) {

        action.callback();

    }

    window.addEventListener("contextmenu", event => {
        event.preventDefault();
        changeModal('context', {isOpened: true, position: {
                left: event.clientX, top: event.clientY}});
    });

    return (
        <div className="context-menu">
            {
                ContextActions.map((action, index) =>
                    <ContextItem callback={() => handleMenu(action)} name={action.name} key={index}></ContextItem>
                )
            }
        </div>
    );
};

export default ContextMenu;