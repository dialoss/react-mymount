import React, {useCallback, useEffect, useRef, useState} from 'react';
import TextEditor from "ui/TextEditor/TextEditor";

const InlineEditor = ({data, closeCallback, mount}) => {
    const [value, setValue] = useState(data.value);
    const inputCallback = useCallback((newValue) => {
        setValue(newValue);
    }, []);
    const ref = useRef();
    useEffect(() => {
        ref.current.editor.container.addEventListener('keydown', event => {
            if (event.key === 'Enter' && event.ctrlKey) {
                closeCallback(ref.current.value, mount);
            }
        })
    }, []);
    return (
        <TextEditor ref={ref}
                    simple={data.simple}
                    value={value}
                    callback={inputCallback}></TextEditor>
    );
};

export default InlineEditor;