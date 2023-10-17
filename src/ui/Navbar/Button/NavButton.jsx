import React from 'react';
import './NavButton.scss';
import {Link} from "react-router-dom";

const NavButton = ({data, active, ...props}) => {
    return (
        <div className={"nav__button " + (active ? "nav__button--current" : "")} {...props}>
            {!!data.callback ?
                <a onClick={data.callback}>{data.text}</a> :
                <Link to={`${data.path}`}>{data.text}</Link>
            }
        </div>
    );
};

export default NavButton;