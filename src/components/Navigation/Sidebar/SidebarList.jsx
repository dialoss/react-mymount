import React from 'react';
import SidebarItem from "./SidebarItem";

const SidebarList = ({pages}) => {
    return (
        <div className="sidebar__list">
            {
                pages.map((page, index) =>
                    <SidebarItem page={page} key={index}></SidebarItem>
                )
            }
        </div>
    );
};

export default SidebarList;