import React from 'react';
import 'styles/navigation/NavButton.css';

const NavButton = ({navData}) => {
    return (
        <div className={"nav-button"}>
            <a href={`${navData.url}`}>{navData.navText}</a>
        </div>
    );
};

export default NavButton;