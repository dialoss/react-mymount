import React from 'react';
import {ContextMenu} from "components/Modals/ContextMenu/index";
import Actions, {ContextActions} from "./actions";
import {useAddEvent} from "hooks/useAddEvent";
import {triggerEvent} from "helpers/events";

const EntryActions = () => {
    function handleContext(event) {
        triggerEvent("context-window:toggle", {isOpened: false});
        Actions.action(event.detail);
    }
    useAddEvent('context-window:button', handleContext);

    const serializeActions = (actions) => {
        return Object.keys(actions).map(action => {
            let subActions = actions[action].actions || [];
            return {
                type: action,
                name: actions[action].name,
                actions: serializeActions(subActions),
                callback: actions[action].callback,
            };
        });
    }
    const actions = serializeActions(ContextActions);
    return (
        <ContextMenu actions={actions}></ContextMenu>
    );
};

export default EntryActions;