import {initPicker, showPicker} from "components/GooglePicker/api/picker";

import React, {useEffect} from 'react';

const GooglePicker = ({uploadField=null, children, ...props}) => {
    useEffect(() => {
        initPicker();
    }, [])
    return (
        <button onClick={() => showPicker(uploadField)} {...props}>{children}</button>
    );
};

export default GooglePicker;