import React from 'react';
import burger from 'assets/svg/burger.svg';
import cross from 'assets/svg/cross.svg';

const ComponentSVG = {
    'burger': burger,
    'cross': cross,
}

const ButtonComponent = ({type, callback}) => {
    return (
        <button className={`action-button ${type}-btn`} onClick={callback}>
            <img src={ComponentSVG[type]} alt={""}/>
        </button>
    );
};

export default ButtonComponent;