import React from 'react';
import SidebarItem from "../Item/SidebarItem";
import "./SidebarList.scss";

const SidebarList = ({list, isOpened}) => {
    return (
        <div className={"sidebar__list " + (isOpened ? "opened" : "closed")}>
            {
                list.sublist.map((item, index) => {
                    return <SidebarItem listItem={item}
                                        key={index}></SidebarItem>
                })
            }
        </div>
    );
};

export default SidebarList;