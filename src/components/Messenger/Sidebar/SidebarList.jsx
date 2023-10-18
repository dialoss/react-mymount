import React, {useContext} from 'react';
import Avatar from "../../../ui/Avatar/Avatar";
import dayjs from "dayjs";

const SidebarList = ({list, className, currentItem, text, subtext=false, selectCallback, user}) => {
    return (
        <div className={"sidebar__list " + className}>
            {
                Object.values(list).map(item => {
                    let msg = item.lastMessage;
                    return <div className={
                        "sidebar-item " +
                        (currentItem(item.id) ? "current " : '') +
                        (item.newMessage && item.lastMessage.user !== user.id ? "new" : '')}
                                onClick={() => selectCallback(item.id)} key={item.id}>
                        <Avatar src={item.picture}
                                style={{width:50, height:50}}>
                        </Avatar>
                        <span className="text-wrapper">
                            <span className={"text"}>{item[text]}</span>
                            {subtext && msg && <span className={"text-block"}>
                                <span className={"subtext subtext-message"}>{
                                    !!msg.value.text ? msg.value.text : msg.value.upload.filename
                                }</span>
                                <span className={"subtext subtext-date"}>{dayjs(msg.time_sent.toDate()).format("HH:mm")}</span>
                            </span>}
                        </span>
                    </div>
                })
            }
        </div>
    );
};

export default SidebarList;