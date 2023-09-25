import React, {useRef, useState} from 'react';
import EntryActions from "components/Modals/ContextMenu/components/EntryActions/EntryActions";
import {useAddEvent} from "hooks/useAddEvent";
import {setActionElement} from "./helpers";
import EditorManager from "components/EditorManager/EditorManager";
import ObjectTransform from "ui/ObjectTransform/ObjectTransform";
import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

const ActionManager = () => {
    const [actionElement, setElement] = useState({});
    const elementRef = useRef();
    elementRef.current = actionElement;
    function setEvent(event) {
        setElement(setActionElement(event.detail));
    }
    useAddEvent('action-event', setEvent);

    function actionCallback(event) {
        const data = event.detail;
        data.entry_id ||= elementRef.current.entry.id;
        data.item_id ||= elementRef.current.item.id;
        triggerEvent('element-changed', data);
    }

    useAddEvent('action-callback', actionCallback);
    return (
        <>
            <EntryActions actionElement={elementRef}></EntryActions>
            <EditorManager></EditorManager>
            <ObjectTransform></ObjectTransform>
        </>
    );
};

export default ActionManager;