import React from 'react';
import "./Message.scss";
import dayjs from "dayjs";

const Message = ({data}) => {
    const formattedDate = (data.time_sent ? dayjs(data.time_sent.toDate()).format("HH:mm") : "");
    return (
        <div className={"message"}>
            <p className={"message-text"}>{data.value}</p>
            {!!formattedDate && <p className={"message-date"}>{formattedDate}</p>}
        </div>
    );
};

export default Message;