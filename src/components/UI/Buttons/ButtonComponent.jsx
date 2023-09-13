import React from 'react';
import styles from 'styles/ui/ActionButton.module.scss';
import burger from 'assets/svg/burger.svg';
import cross from 'assets/svg/cross.svg';

const ComponentSVG = {
    'open': burger,
    'close': cross,
}

const ButtonComponent = ({type, callback, ...props}) => {
    return (
        <button {...props} className={`action-button ${styles.button} ${type}-btn`} onClick={callback}>
            <img src={ComponentSVG[type]} alt={""}/>
        </button>
    );
};

export default ButtonComponent;