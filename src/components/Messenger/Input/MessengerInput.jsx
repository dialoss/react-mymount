import React, {useContext, useRef} from 'react';
import TextEditor from "../../../ui/TextEditor/TextEditor";
import {ReactComponent as Attachment} from '../Message/assets/attachment.svg';
import {ReactComponent as Send} from '../Message/assets/send.svg';
import "./MessengerInput.scss";

const MessengerInput = ({message, sendCallback, uploadCallback, textCallback}) => {
    const ref = useRef();
    return (
        <div className={"messenger-input"}>
            <div className="icon icon-attachment" onClick={() => ref.current.click()}>
                <input type="file" hidden ref={ref} onChange={uploadCallback}/>
                <Attachment></Attachment>
            </div>
            {!!message.upload.length && <div className={"uploads"}>
                {
                    message.upload.map(u => <p key={u.name}>{u.name}</p>)
                }
            </div>}
            <div className="editor-wrapper">
                <TextEditor value={message.text} callback={textCallback} simple={true}></TextEditor>
            </div>
            <div className="icon icon-send" onClick={sendCallback}>
                <Send></Send>
            </div>
        </div>
    );
};

export default MessengerInput;