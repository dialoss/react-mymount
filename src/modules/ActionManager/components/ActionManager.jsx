import React from 'react';
import EntryActions from "./EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {setActionElement} from "./helpers";

const ActionManager = () => {
    function handleAction(event) {
        setActionElement(event.detail);
    }
    useAddEvent('action-event', handleAction);
    return (
        <EntryActions></EntryActions>
    );
};

export default ActionManager;