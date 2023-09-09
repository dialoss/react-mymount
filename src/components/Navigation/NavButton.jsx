import React from 'react';
import 'styles/navigation/NavButton.scss';
import {Link} from "react-router-dom";

const NavButton = ({navData, active}) => {
    return (
        <div className={"nav-button " + (active ? "nav-button--current" : "")}>
            <Link to={`${navData.path}`}>{navData.text}</Link>
        </div>
    );
};

export default NavButton;