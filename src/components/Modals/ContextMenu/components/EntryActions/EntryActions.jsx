import React from 'react';
import {ContextMenu} from "components/Modals/ContextMenu/index";
import {ContextActions} from "./actions";
import {useAddEvent} from "hooks/useAddEvent";
import {triggerEvent} from "helpers/events";

const EntryActions = ({actionElement}) => {
    function handleContext(event) {
        triggerEvent("context-window", {isOpened: false});
        const requestData = ContextActions[event.detail.type].callback({actionElement:actionElement.current});
        for (const data of requestData) {
            triggerEvent("action-callback", data);
        }
    }
    useAddEvent('context-action', handleContext);

    const actions = Object.keys(ContextActions).map(action => {
        return {type: action, name:ContextActions[action].name};
    });
    return (
        <ContextMenu actions={actions}></ContextMenu>
    );
};

export default EntryActions;