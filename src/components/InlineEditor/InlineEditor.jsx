import React, {useCallback, useEffect, useRef, useState} from 'react';
import TextEditor from "ui/TextEditor/TextEditor";
import {triggerEvent} from "../../helpers/events";

const InlineEditor = ({data, closeCallback, mount}) => {
    const [value, setValue] = useState(data.value);
    const inputCallback = useCallback((newValue) => {
        setValue(newValue);
    }, []);
    const ref = useRef();
    useEffect(() => {
        ref.current.editor.container.addEventListener('keydown', event => {
            if (event.key === 'Escape' || (event.key === 'Enter' && event.ctrlKey)) {
                closeCallback(ref.current.value, mount);
            }
        });
        ref.current.focus();
        if (!data.simple) {
            let block = ref.current.editor.container.closest('.quill');
            block.style.width = Math.max(300, block.clientWidth + 50) + "px";
            block.closest('.transform-item').style.width = 'auto'
        }

        triggerEvent("container:init", {container:ref.current.editor.container.closest(".transform-container")});
    }, []);

    return (
        <TextEditor ref={ref}
                    simple={data.simple}
                    value={value}
                    callback={inputCallback}></TextEditor>
    );
};

export default InlineEditor;