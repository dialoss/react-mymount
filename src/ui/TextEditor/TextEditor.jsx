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
        if (ref) ref.current.focus();
    }, []);

    let config = (!simple ? modules : {toolbar:false});

    function inputCallback(value) {
        if (simple) value = value.replace(/<\/?[^>]+(>|$)/g, "");
        callback(value);
    }
    
    return (
        <ReactQuill className={simple?"ql-simple":""}
                    ref={ref}
                    theme="snow"
                    value={value}
                    onChange={inputCallback}
                    modules={config}
        />
    );
});

export default TextEditor;