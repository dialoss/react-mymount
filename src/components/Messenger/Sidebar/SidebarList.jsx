import React from 'react';
import Avatar from "../../../ui/Avatar/Avatar";

const SidebarList = ({list, className, currentItem, text, subtext, selectCallback}) => {
    return (
        <div className={"sidebar__list " + className}>
            {
                Object.values(list).map(item =>
                    <div className={"sidebar-item " + (currentItem(item.id) ? "current" : '')}
                         onClick={() => selectCallback(item.id)} key={item.id}>
                        <Avatar src={item.picture}
                                style={{width:50, height:50}}>
                        </Avatar>
                        <div className="text-wrapper">
                            <p className={"text"}>{item[text]}</p>
                            {!!subtext && <p className={"subtext"}>{item[subtext]}</p>}
                        </div>
                    </div>)
            }
        </div>
    );
};

export default SidebarList;