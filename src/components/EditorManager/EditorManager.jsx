import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAddEvent} from "hooks/useAddEvent";
import InlineEditor from "components/InlineEditor/InlineEditor";
import {createPortal} from "react-dom";
import {triggerEvent} from "helpers/events";

const EditorManager = () => {
    const [editors, setEditors] = useState([]);

    function toggleEditor(event) {
        const element = event.detail.element;

        const edit = React.createElement(InlineEditor, {
            data:event.detail,
            closeCallback,
            mount: element,
        });

        element.innerHTML = '';

        setEditors(editors => {
            return [
                ...editors,
                {
                    component: edit,
                    mount: element,
                }
            ];
        });
        triggerEvent("action-event", event.detail.event);
    }

    const fieldToUpdate = useRef();

    const closeCallback = useCallback((value, mount) => {
        setEditors(editors =>
            editors.map(ed => {
                if (ed.mount === mount) {
                    fieldToUpdate.current = {value, mount};
                    return;
                }
                return ed;
            }).filter(Boolean)
        );
        triggerEvent("action-callback", {value, mount});
    }, []);

    useEffect(() => {
        if (!!fieldToUpdate.current) {
            fieldToUpdate.current.mount.innerHTML = fieldToUpdate.current.value;
            fieldToUpdate.current = null;
        }
    }, [editors]);

    useAddEvent('toggle-editor', toggleEditor);
    return (
        <>
            {
                editors.map(editor =>
                    createPortal(editor.component, editor.mount)
                )
            }
        </>
    );
};

export default EditorManager;