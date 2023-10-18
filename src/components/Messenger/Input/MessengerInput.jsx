import React, {useContext, useRef} from 'react';
import TextEditor from "../../../ui/TextEditor/TextEditor";
import {ReactComponent as Attachment} from '../Message/assets/attachment.svg';
import {ReactComponent as Send} from '../Message/assets/send.svg';
import "./MessengerInput.scss";
import FormMedia from "../../Modals/MyForm/Upload/FormMedia";

const MessengerInput = ({message, sendCallback, uploadCallback, textCallback}) => {
    const ref = useRef();
    return (
        <div className={"messenger-input"}>
            <div className="icon icon-attachment" onClick={() => ref.current.click()}>
                <input type="file" hidden ref={ref} onChange={uploadCallback}/>
                <Attachment></Attachment>
            </div>
            <FormMedia files={message.upload}></FormMedia>
            <TextEditor value={message.text} callback={textCallback} simple={true}></TextEditor>
            <div className="icon icon-send" onClick={sendCallback}>
                <Send></Send>
            </div>
        </div>
    );
};

export default MessengerInput;