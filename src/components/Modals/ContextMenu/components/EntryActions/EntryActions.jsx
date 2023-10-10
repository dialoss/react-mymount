import React from 'react';
import {ContextMenu} from "components/Modals/ContextMenu/index";
import {ContextActions} from "./actions";
import {useAddEvent} from "hooks/useAddEvent";
import {triggerEvent} from "helpers/events";
import {actionElement, actionElements} from "modules/ActionManager/components/helpers";

const EntryActions = () => {
    function handleContext(event) {
        triggerEvent("context-window:toggle", {isOpened: false});
        const requestData = ContextActions[event.detail.type].callback({actionElement, actionElements});
        for (const data of requestData) {
            triggerEvent("action:callback", data);
        }
    }
    useAddEvent('context-window:button', handleContext);

    const actions = Object.keys(ContextActions).map(action => {
        return {type: action, name:ContextActions[action].name};
    });
    return (
        <ContextMenu actions={actions}></ContextMenu>
    );
};

export default EntryActions;