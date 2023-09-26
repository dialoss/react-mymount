import {initPicker, showPicker} from "components/GooglePicker/api/picker";
import React, {useEffect} from 'react';

const GooglePicker = ({uploadField=null, children, ...props}) => {
    useEffect(() => {
        initPicker();
    }, [])
    return (
        <a onClick={() => showPicker(uploadField)} {...props}>{children}</a>
    );
};

export default GooglePicker;