import React from 'react';
import 'styles/ui/CloseButton.css';
import cross from 'assets/svg/cross.svg';

const CloseButton = ({close}) => {
    return (
        <button className="close-btn" onClick={close}>
            <img src={cross} alt={""}/>
        </button>
    );
};

export default CloseButton;