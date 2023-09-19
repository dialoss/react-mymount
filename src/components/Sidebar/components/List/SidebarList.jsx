import React, {useEffect, useRef, useState} from 'react';
import SidebarItem from "../Item/SidebarItem";
import "./SidebarList.scss";
import {ListStyle} from "./style";

const SidebarList = ({list, isOpened}) => {
    const ref = useRef();

    return (
        <div className={"sidebar__list"}
             ref={ref}
             style={ListStyle(isOpened)}>
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