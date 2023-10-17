import React from 'react';
import Avatar from "../../../ui/Avatar/Avatar";

const SidebarList = ({list, className, currentItem, textSelector, clickCallback}) => {
    return (
        <div className={"sidebar__list " + className}>
            {
                Object.values(list).map(item =>
                    <div className={"sidebar-item " + (currentItem(item.id) ? "current" : '')}
                         onClick={() => clickCallback(item.id)} key={item.id}>
                        <Avatar src={item.picture}
                                style={{width:50, height:50}}>
                        </Avatar>
                        <p className={"title"}>{item[textSelector]}</p>
                    </div>)
            }
        </div>
    );
};

export default SidebarList;