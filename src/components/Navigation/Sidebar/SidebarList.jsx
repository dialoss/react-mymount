import React from 'react';
import SidebarItem from "./SidebarItem";

const SidebarList = React.forwardRef(function SidebarList({pages, callback, ...props}, ref) {
    return (
        <div className="sidebar__list" {...props} ref={ref}>
            {
                pages.map((page, index) =>
                    <SidebarItem currentCallback={callback} page={page} key={index}></SidebarItem>
                )
            }
        </div>
    );
});

export default SidebarList;