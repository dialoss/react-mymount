import React, {useEffect, useState} from 'react';
import ContextMenu from "./components/ContextMenu/ContextMenu";
import {triggerEvent} from "helpers/events";
import {ModalManager} from "components/ModalManager";
import {getPressDelta, registerPress} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";

const ContextMenuContainer = ({actions}) => {
    const name = "context-window:toggle";
    const [position, setPosition] = useState({left: 0, top: 0});
    function contextMenu(event) {
        event.preventDefault();
        triggerEvent('action:init', event);
        if (getPressDelta() > 100) return;
        if (!event.ctrlKey) {
            setPosition({left: event.clientX, top: event.clientY});
            triggerEvent(name, {isOpened: true});
        }
    }
    function onScroll() {
        triggerEvent(name, {isOpened: false});
    }
    function onMouseDown(event) {
        if (event.ctrlKey) triggerEvent('action:init', event);
        if (event.button === 2) registerPress();
    }
    useAddEvent("mousedown", onMouseDown);
    useAddEvent("contextmenu", contextMenu);
    useAddEvent("scroll", onScroll);

    return (
        <ModalManager name={name} key={name}>
            <ContextMenu style={{bg:'without-bg'}} actions={actions} position={position}></ContextMenu>
        </ModalManager>
    );
};

export default ContextMenuContainer;