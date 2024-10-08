import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAddEvent} from "hooks/useAddEvent";
import InlineEditor from "components/InlineEditor/InlineEditor";
import {createPortal} from "react-dom";
import {triggerEvent} from "helpers/events";

const EditorManager = () => {
    const [editors, setEditors] = useState([]);

    function toggleEditor(event) {
        triggerEvent("action:init", event.detail.event);
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
        let type = mount.classList[1].split('-')[1];
        if (type === 'textfield') type = 'text';
        triggerEvent("action:callback", () => [{[type]: value, element: {}, method:'PATCH'}]);
    }, []);

    useEffect(() => {
        if (!!fieldToUpdate.current) {
            fieldToUpdate.current.mount.style.width = "auto";
            fieldToUpdate.current.mount.innerHTML = fieldToUpdate.current.value;
            triggerEvent("container:init", {container:fieldToUpdate.current.mount.closest(".transform-container")});
            fieldToUpdate.current = null;
        }
    }, [editors]);

    useAddEvent('text-editor:toggle', toggleEditor);
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