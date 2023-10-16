import React from 'react';
import {ContextMenu} from "components/Modals/ContextMenu/index";
import Actions, {ContextActions} from "./actions";
import {useAddEvent} from "hooks/useAddEvent";
import {triggerEvent} from "helpers/events";

const EntryActions = () => {
    function handleContext(event) {
        triggerEvent("context-window:toggle", {isOpened: false});
        Actions.action(ContextActions[event.detail.type].callback);
    }
    useAddEvent('context-window:button', handleContext);

    const actions = Object.keys(ContextActions).map(action => {
        return {type: action, name: ContextActions[action].name};
    });
    return (
        <ContextMenu actions={actions}></ContextMenu>
    );
};

export default EntryActions;