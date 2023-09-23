import React, {useEffect, useLayoutEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {configQuill, modules} from "./config";
import "./TextEditor.scss";

const TextEditor = React.forwardRef(function TextEditor({simple, value, callback}, ref) {
    useLayoutEffect(() => {
        configQuill();
    }, []);

    useEffect(() => {
        ref.current.focus();
    }, []);

    let config = (!simple ? modules : {toolbar:false});

    return (
        <ReactQuill ref={ref}
                    theme="snow"
                    value={value}
                    onChange={callback}
                    modules={config}
        />
    );
});

export default TextEditor;