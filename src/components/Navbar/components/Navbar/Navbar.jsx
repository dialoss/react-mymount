import React from 'react';
import NavButton from "../Button/NavButton";
import './Navbar.scss';

const Navbar = ({routes, location}) => {
    return (
        <div className={"navbar"}>
            {routes.map((navData, index) => {
                const isActive = (location.relativeURL.split('/')[1] === navData.path.split('/')[1]);
                return <NavButton active={isActive} navData={navData} key={index}/>
            })}
        </div>
    );
};

export default Navbar;