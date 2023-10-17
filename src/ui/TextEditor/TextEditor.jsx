import React, {useEffect, useLayoutEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {configQuill, modules} from "./config";
import "./TextEditor.scss";

const TextEditor = React.forwardRef(function TextEditor({simple, value, callback}, ref) {
    useLayoutEffect(() => {
        configQuill();
    }, []);

    let config = (!simple ? modules : {toolbar:false});
    const msgRef = useRef();

    function inputCallback(value) {
        if (simple) value = value.replace(/<\/?[^>]+(>|$)/g, "");
        if (!value) msgRef.current.editor.root.innerHTML = '';
        else callback(value);
    }
    
    return (
        <ReactQuill className={simple?"ql-simple":""}
                    ref={ref || msgRef}
                    theme="snow"
                    value={`<p>${value}</p>`}
                    onChange={inputCallback}
                    modules={config}
        />
    );
});

export default TextEditor;