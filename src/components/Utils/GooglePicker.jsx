import React from 'react';
import {initPicker} from "scripts/network/picker";
import {showPicker} from "scripts/network/picker";

const GooglePicker = ({text, ...props}) => {
    initPicker();
    return (
        <button {...props} onClick={() => showPicker(null)}>{text}</button>
    );
};

export default GooglePicker;