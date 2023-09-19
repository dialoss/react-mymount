import React, {useLayoutEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {configQuill, modules} from "./config";
import "./TextEditor.scss";

const TextEditor = ({width, simple, value, callback}) => {
    useLayoutEffect(() => {
        configQuill();
    }, []);

    let config = (!simple ? modules : {toolbar:false});

    function closeEditor(event) {
        if (event.key === 'Enter' && event.ctrlKey) callback('', true);
    }

    return <ReactQuill theme="snow"
                       style={{width, margin: "0 auto"}}
                       value={value}
                       onKeyDown={closeEditor}
                       onChange={callback}
                       modules={config}
    />;
};

export default TextEditor;