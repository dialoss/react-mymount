import React, {useEffect, useRef, useState} from 'react';
import SidebarList from "./SidebarList";
import styles from 'styles/navigation/sidebar/Sidebar.scss';
import {Link} from "react-router-dom";
import {darkenColor} from "scripts/utils/rgbmanip";
import {useSelector} from "react-redux";
import {current} from "@reduxjs/toolkit";

function ListStyle(opened, height) {
    const styles = {
        true: {
            height: height + "px",
            marginTop: "5px",
        },
        false: {
            height: "0",
            marginTop: "0",
        }
    }
    return styles[opened];
}

const linkColor = styles.linkColor;

const SidebarItem = ({page, currentCallback}) => {
    const [sublist, setSublist] = useState([]);
    const [listOpened, setListOpened] = useState(false);
    const [listHeight, setListHeight] = useState(0);
    const listRef = React.createRef();
    const mounted = useRef(null);
    const haveSublist = !!sublist.length;
    const location = useSelector((state) => state.location);
    const isCurrent = (location.relativeURL === page.link);

    useEffect(() => {
        if (!mounted.current) {
            setSublist(page.subpages);
        } else {
            if (listRef.current != null) {
                let h = listRef.current.getBoundingClientRect().height;
                setListHeight(Math.max(h, listHeight));
            }
        }
    });

    useEffect(() => {
        if (isCurrent && currentCallback) {
            currentCallback();
        }
    }, [])

    return (
        <div className="sidebar__item">
            {/*<Link className="sidebar__link" to={page.link}*/}
            {/*      style={sublist ? {paddingLeft: "20px"} : {}}>{page.text}</Link>*/}
            <div className={"sidebar__link-wrapper"}>
                <a className={"sidebar__link " + (isCurrent ? 'sidebar__link--current' : '')} href={page.link}
                   style={{
                   ...(!isCurrent ? {backgroundColor: darkenColor(linkColor, page.depth * 10 / 100)}: {}),
                    ...(sublist.length ? {marginLeft: "20px"} : {})
                   }}>
                    {page.text}
                </a>
                {haveSublist && <button ref={mounted} className="sidebar__link-btn"
                                        onClick={() => setListOpened(!listOpened)}></button>}
            </div>
            {haveSublist && <SidebarList callback={() => setListOpened(true)} ref={listRef} pages={sublist}
                                         style={mounted.current ? ListStyle(listOpened, listHeight) : {position:"absolute"}}>
            </SidebarList>}
        </div>
    );
};

export default SidebarItem;