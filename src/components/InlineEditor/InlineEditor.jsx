import React, {useCallback, useRef, useState} from 'react';
import TextEditor from "ui/TextEditor/TextEditor";

const InlineEditor = ({data}) => {
    const [value, setValue] = useState(data.value);
    const inputCallback = useCallback((newValue) => {
        setValue(newValue);
    }, []);
    const ref = useRef();
    return (
        <TextEditor ref={ref}
                    simple={data.simple}
                    value={value}
                    callback={inputCallback}></TextEditor>
    );
};

export default InlineEditor;