import React, {useContext} from 'react';
import Avatar from "../../../ui/Avatar/Avatar";
import dayjs from "dayjs";

const SidebarList = ({list, className, currentItem, text, subtext=false, selectCallback, user}) => {
    return (
        <div className={"messenger-sidebar__list " + className}>
            {
                Object.values(list).map(item => {
                    let msg = item.lastMessage;
                    return <div className={"sidebar-item__wrapper " + (currentItem(item.id) ? "current " : '') +
                        (item.newMessage && item.lastMessage.user !== user.id ? "new" : '')} key={item.id}>
                        <div className={"sidebar-item"}
                             onClick={() => selectCallback(item.id)}>
                            <div className="avatar__wrapper">
                                <Avatar src={item.picture}
                                        style={{width:50, height:50}}>
                                </Avatar>
                            </div>
                            <span className="text-wrapper">
                            <span className={"text"}>
                                <span className={'wrapper'}>{item[text]}
                                </span>
                            </span>
                                {subtext && msg && <span className={"text-block"}>
                                <span className={"subtext subtext-message"}>
                                    <span className={'wrapper'}>
                                        {
                                            !!msg.value.text ? msg.value.text : msg.value.upload.filename
                                        }
                                    </span>
                                </span>
                                <span className={"subtext subtext-date"}>
                                    <span className={'wrapper'}>
                                        {dayjs(msg.time_sent.toDate()).format("HH:mm")}
                                    </span>
                                </span>
                            </span>}
                        </span>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default SidebarList;