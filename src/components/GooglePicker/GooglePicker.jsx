import {initPicker, showPicker} from "components/GooglePicker/api/picker";

import React from 'react';
import GooglePicker from "../../ui/Buttons/GooglePickerButton/GooglePickerButton";

const GooglePicker = ({uploadField=null, children}) => {
    initPicker();
    return (
        <GooglePicker callback={() => showPicker(uploadField)}/>
    );
};

export default GooglePicker;