import React, {useEffect} from 'react';
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";
import {setItemTransform} from "./transform";
import {initContainerDimensions} from "./helpers";
import {useUserAuth} from "../../hooks/useUserAuth";

const ObjectTransform = () => {
    const userAuth = useUserAuth();
    function transformCallback(data) {
        triggerEvent("action:callback", data);
    }

    function initTransform(event) {
        if (!userAuth) return;
        const btn = event.detail.btn;
        const item = btn.closest(".transform-item");
        if (!!item.querySelector(".item-model")) return;

        setItemTransform(event.detail.event, event.detail.type, item, btn, transformCallback);
        triggerEvent("action:init", event.detail.event);
    }

    function initContainer(event) {
        initContainerDimensions(event.detail);
    }

    useAddEvent("container:init", initContainer);
    useAddEvent("transform:init", initTransform);

    return (
        <></>
    );
};

export default ObjectTransform;