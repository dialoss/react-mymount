import React from 'react';
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";
import {setItemTransform} from "./transform";
import {initContainerHeight} from "./helpers";

const ObjectTransform = () => {
    function transformCallback(data) {
        triggerEvent("action-callback", data);
    }

    function initTransform(event) {
        const btn = event.detail.btn;
        const item = btn.closest(".transform-item");
        if (!!item.querySelector(".item-model")) return;

        setItemTransform(event.detail.event, event.detail.type, item, btn, transformCallback);
        triggerEvent("action-event", event.detail.event);
    }

    function initContainer(event) {
        initContainerHeight(event.detail);
    }

    useAddEvent("init-container", initContainer);
    useAddEvent("transform-item", initTransform)

    return (
        <></>
    );
};

export default ObjectTransform;