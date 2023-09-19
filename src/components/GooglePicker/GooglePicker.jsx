import {initPicker, showPicker} from "components/GooglePicker/api/picker";

import React from 'react';

const GooglePicker = ({uploadField=null, children, ...props}) => {
    initPicker();
    return (
        <button onClick={() => showPicker(uploadField)} {...props}>{children}</button>
    );
};

export default GooglePicker;