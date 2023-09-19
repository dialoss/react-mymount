import React from 'react';
import './WindowButton.scss';
import burger from './assets/burger.svg';
import cross from './assets/cross.svg';

const ComponentSVG = {
    'open': burger,
    'close': cross,
}

const WindowButton = ({type, callback, className={}, ...props}) => {
    return (
        <button {...props} className={`window-button ${type}-btn ${className}`} onClick={callback}>
            <img src={ComponentSVG[type]} alt={""}/>
        </button>
    );
};

export default WindowButton;