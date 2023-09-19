import React from 'react';
import './ActionButton.scss';

const ActionButton = ({children, ...props}) => {
    return (
        <button {...props} className="action-button">{children}</button>
    );
};

export default ActionButton;