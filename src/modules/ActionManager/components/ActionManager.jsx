import React from 'react';
import EntryActions from "components/Modals/ContextMenu/components/EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {actionElement, setActionElement} from "./helpers";
import EditorManager from "components/EditorManager/EditorManager";
import ObjectTransform from "ui/ObjectTransform/ObjectTransform";
import {triggerEvent} from "helpers/events";

const ActionManager = () => {
    function initAction(event) {
        setActionElement(event.detail);
    }
    useAddEvent('action:init', initAction);

    function actionCallback(event) {
        const data = event.detail;
        if (!!actionElement) {
            data.entry_id ||= actionElement.entry.id;
            data.item_id ||= actionElement.item.id;
        }
        triggerEvent('entrylist:handle-changes', data);
    }

    useAddEvent('action:callback', actionCallback);
    return (
        <>
            <EntryActions></EntryActions>
            <EditorManager></EditorManager>
            <ObjectTransform></ObjectTransform>
        </>
    );
};

export default ActionManager;