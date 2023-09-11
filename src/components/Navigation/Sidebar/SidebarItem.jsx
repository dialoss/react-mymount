import React, {useEffect, useState} from 'react';
import SidebarList from "./SidebarList";

const SidebarItem = ({page}) => {
    const [sublist, setSublist] = useState([]);
    useEffect(()=>{
        setSublist(page.subpages);
    }, []);
    return (
        <div className="sidebar__item">
            <a className="sidebar__link" href={page.link}
               style={sublist.length ? {paddingLeft: "20px"} : {}}>{page.text}</a>
            {sublist.length && <>
                <button className="sidebar__link-btn"></button>
                <SidebarList pages={sublist}></SidebarList>
            </>}
        </div>
    );
};

export default SidebarItem;