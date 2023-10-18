import React, {useEffect, useLayoutEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {configQuill, modules} from "./config";
import "./TextEditor.scss";
import {triggerEvent} from "../../helpers/events";

const TextEditor = React.forwardRef(function TextEditor({simple, value, callback}, ref) {
    useLayoutEffect(() => {
        configQuill();
        let field = msgRef.current.getEditor().root;
        field.dataset.placeholder = 'Сообщение';
        field.focus();
        field.addEventListener('blur', (e) => {
            let target = e.relatedTarget;
            if (!target) {
                field.focus();
            } else {
                target.addEventListener('blur', () => field.focus());
            }
        });
        field.addEventListener('keydown', (e) => triggerEvent('messenger:keydown', e));
    }, []);

    let config = (!simple ? modules : {toolbar:false});
    const msgRef = useRef();

    function clearText(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    }

    function inputCallback(value) {
        if (simple) value = clearText(value);
        let field = msgRef.current.getEditor();
        field.focus();
        if (!value.length && !clearText(field.getText())){
            field.innerHTML = '';
        }
        else {
            callback(value);
        }
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