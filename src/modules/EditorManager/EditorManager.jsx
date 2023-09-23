import React, {useCallback, useReducer, useRef, useState} from 'react';
import {useAddEvent} from "hooks/useAddEvent";
import InlineEditor from "components/InlineEditor/InlineEditor";
import {createPortal} from "react-dom";
import TextEditor from "../../ui/TextEditor/TextEditor";

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.editor];
        case 'REMOVE':
            console.log(action);
            return
        case 'CHANGE':

    }
}

const EditorManager = () => {
    const [editors, dispatch] = useReducer(reducer, []);
    const editorsRef = useRef();
    editorsRef.current = editors;

    function inputCallback(value) {
        dispatch({type: 'CHANGE', })
    }

    function toggleEditor(event) {
        const element = event.detail.element;

        const edit = React.createElement(TextEditor, {
            simple: event.detail.simple,
            // value: editorsRef.current[],
            inputCallback
        });

        element.innerHTML = '';

        dispatch({type: 'ADD', editor: {
                component: edit,
                mount: element,
                value: event.detail.value
        }});

        element.addEventListener('keydown', event => {
            if (event.key === 'Enter' && event.ctrlKey) {
                // element.innerHTML =
                dispatch({type: 'REMOVE', editor: {}})
            }

        })
    }

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