import React from 'react';
import 'styles/ui/CloseButton.scss';
import burger from 'assets/svg/burger.svg';

const BurgerButton = ({callback}) => {
    return (
        <button className="burger-btn" onClick={callback}>
            <img src={burger} alt={""}/>
        </button>
    );
};

export default BurgerButton;