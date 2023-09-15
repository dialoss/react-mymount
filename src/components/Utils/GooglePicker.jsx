import React from 'react';
import {initPicker, showPicker} from "scripts/network/picker";

const GooglePicker = ({text, uploadField=null, ...props}) => {
    initPicker();
    return (
        <button {...props} onClick={() => showPicker(uploadField)}>{text}</button>
    );
};

export default GooglePicker;