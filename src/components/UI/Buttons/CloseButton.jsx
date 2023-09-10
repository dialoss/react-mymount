import React from 'react';
import 'styles/ui/CloseButton.scss';
// import cross from 'assets/svg/cross.svg';

const CloseButton = ({close}) => {
    return (
        <button className="close-btn" onClick={close}>
            <img src={""} alt={""}/>
        </button>
    );
};

export default CloseButton;