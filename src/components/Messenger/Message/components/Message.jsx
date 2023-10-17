import React from 'react';
import "./Message.scss";
import dayjs from "dayjs";
import {Components} from "../../../Entry/components/Item/components/ItemData";

const Message = ({data}) => {
    const formattedDate = (data.time_sent ? dayjs(data.time_sent.toDate()).format("HH:mm DD.MM") : "");
    return (
        <div className={"message"}>
            {!!data.url && !!data.type && React.createElement(Components[data.type], {data:data})}
            <p className={"message-text"}>{data.value}</p>
            {!!formattedDate && <p className={"message-date"}>{formattedDate}</p>}
        </div>
    );
};

export default Message;