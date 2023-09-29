import React from 'react';
import './NavButton.scss';
import {Link} from "react-router-dom";

const NavButton = ({navData, active}) => {
    return (
        <div className={"nav__button " + (active ? "nav__button--current" : "")}>
            {navData.callback ?
                <a onClick={navData.callback}>{navData.text}</a> :
                <Link to={`${navData.path}`}>{navData.text}</Link>
            }
        </div>
    );
};

export default NavButton;