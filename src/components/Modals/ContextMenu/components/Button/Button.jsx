import React, {useCallback} from 'react';
import {triggerEvent} from "helpers/events";
import "./Button.scss";

const ContextButton = ({name}) => {
    const callback = useCallback(() => {
        triggerEvent('context-action', {name});
    }, []);
    return (
        <button className="context__button" onClick={callback}>{name}</button>
    );
};

export default ContextButton;