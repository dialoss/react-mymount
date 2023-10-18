import React from 'react';
import "./Message.scss";
import dayjs from "dayjs";
import {Components} from "../../../Entry/components/Item/components/ItemData";

const Message = ({data}) => {
    const formattedDate = (data.time_sent ? dayjs(data.time_sent.toDate()).format("HH:mm DD.MM") : "");
    let upload = data.value.upload;
    let text = data.value.text;
    return (
        <div className={"message"}>
            {!!upload.url && !!upload.type && React.createElement(Components[upload.type], {data:upload})}
            <p className={"message-text"}>{text}</p>
            {!!formattedDate && <p className={"message-date"}>{formattedDate}</p>}
        </div>
    );
};

export default Message;