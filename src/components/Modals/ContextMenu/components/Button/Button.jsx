import React, {useCallback} from 'react';
import {triggerEvent} from "helpers/events";
import "./Button.scss";

const ContextButton = ({action}) => {
    const callback = useCallback(() => {
        triggerEvent('context-action', {type:action.type});
    }, []);
    return (
        <button className="context__button" onClick={callback}>{action.name}</button>
    );
};

export default ContextButton;