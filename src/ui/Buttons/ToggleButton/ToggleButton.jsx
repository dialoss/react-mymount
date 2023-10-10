import React from 'react';
import "./ToggleButton.scss";

const ToggleButton = ({isOpened, children, ...props}) => {
    return (
        <div {...props} className={"toggle-button " + (isOpened ? "opened" : "closed")}>
            {children}
        </div>
    );
};

export default ToggleButton;