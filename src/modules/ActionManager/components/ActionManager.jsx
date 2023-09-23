import React from 'react';
import EntryActions from "./EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {setActionElement} from "./helpers";
import EditorManager from "modules/EditorManager/EditorManager";
import ObjectTransform from "../../../ui/ObjectTransform/ObjectTransform";

const ActionManager = () => {
    function handleAction(event) {
        setActionElement(event.detail);
    }
    useAddEvent('action-event', handleAction);
    return (
        <>
            <EntryActions></EntryActions>
            <EditorManager></EditorManager>
            <ObjectTransform></ObjectTransform>
        </>

    );
};

export default ActionManager;