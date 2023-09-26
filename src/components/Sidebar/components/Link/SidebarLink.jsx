import React from 'react';
import {darkenColor} from "../rgbmanip";
import styles from "./SidebarLink.scss";
import {useMyLocation} from "hooks/useMyLocation";
import {Link} from "react-router-dom";

const linkColor = styles.linkColor;

const SidebarLink = ({link, children, depth, haveSublist, callback}) => {
    const isCurrent = useMyLocation().relativeURL === link;
    let style = {
        ...(!isCurrent ? {backgroundColor: darkenColor(linkColor, depth * 10 / 100)} : {}),
        ...(haveSublist ? {marginLeft: "20px"} : {})
    };
    return (
        <div className={"sidebar__link-wrapper"}>
            <Link className={"sidebar__link " + (isCurrent ? 'sidebar__link--current' : '')}
                  to={link}
                  style={style}>{children}
            </Link>
            {haveSublist && <button className="sidebar__link-btn" onClick={callback}></button>}
        </div>
    );
};

export default SidebarLink;