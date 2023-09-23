import React, {useEffect, useState} from 'react';
import ContextMenu from "./components/ContextMenu/ContextMenu";
import {triggerEvent} from "helpers/events";
import {ModalManager} from "components/ModalManager";
import {useAddEvent} from "hooks/useAddEvent";

const ContextMenuContainer = ({actions}) => {
    const name = "context-window";
    const [position, setPosition] = useState({left: 0, top: 0});
    function contextMenu(event) {
        event.preventDefault();
        setPosition({left: event.clientX, top: event.clientY});
        triggerEvent(name, {isOpened: true});
        triggerEvent('action-event', event);
    }
    function onScroll() {
        triggerEvent(name, {isOpened: false});
    }

    useAddEvent("contextmenu", contextMenu);
    useAddEvent("scroll", onScroll);

    return (
        <ModalManager name={name} key={name}>
            <ContextMenu style={{opacity: "0"}} actions={actions} position={position}></ContextMenu>
        </ModalManager>
    );
};

export default ContextMenuContainer;