import React from 'react';
import {ContextMenu} from "components/Modals/ContextMenu";
import {ContextActions} from "./actions";
import {handleEntryAction, setActionElement} from "../helpers";
import {useAddEvent} from "hooks/useAddEvent";

const EntryActions = () => {
    function handleContext(event) {
        handleEntryAction(ContextActions[event.detail.name]);
    }
    useAddEvent('context-action', handleContext);

    const actions = Object.values(ContextActions).map(action => action.name);
    return (
        <ContextMenu actions={actions}></ContextMenu>
    );
};

export default EntryActions;