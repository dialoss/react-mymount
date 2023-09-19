import React, {useEffect, useRef, useState} from 'react';
import {TextEditor} from "modules/TextEditor";

const InfoParagraphContainer = ({type, children, ...props}) => {
    const [editor, setEditor] = useState({isOpened: false, value: children, width: 0});

    function callback(newValue, close) {
        if (close === true) {
            setEditor({...editor, isOpened: false});
            return;
        }

        setEditor({...editor, value: newValue});
        console.log(editor.value);
    }

    const simpleEditor = (type !== "textfield");
    const ref = useRef();
    function toggleEditor(event) {
        if (event.detail === 2) {
            let width = ref.current.getBoundingClientRect().width + 50;
            width = Math.max(width, 300);
            setEditor({...editor, width, isOpened: true});
        }
    }
    useEffect(() => {
        ref.current.innerHTML = children;
    }, [children])
    useEffect(() => {
        if (editor.isOpened) {
            setEditor({...editor, value: ref.current.innerHTML});
            ref.current.innerHTML = '';
        } else {
            ref.current.innerHTML = editor.value;
        }
    }, [editor.isOpened])
    return (
        <>
            <p onClick={toggleEditor} ref={ref} {...props}
               className={`info__paragraph info__paragraph-${type}`}></p>
            {editor.isOpened && <TextEditor width={editor.width} callback={callback} value={editor.value} simple={simpleEditor}/>}
        </>
    );
};

export default InfoParagraphContainer;