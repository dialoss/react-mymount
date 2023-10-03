import React from 'react';
import Container from "ui/Container/Container";
import Timeline from "components/Timeline/Timeline";
import {prepareColors, Stages} from "./stages";
import {useAddEvent} from "hooks/useAddEvent";
import {triggerEvent} from "helpers/events";

const CustomerPage = () => {

    function handleAction(event) {
        triggerEvent("router:navigate", {path:"/customer/"});
        switch (event.detail.action) {
            case 'BUY':
                break;
            case 'ORDER':
                break;
        }

    }
    useAddEvent("customer:action", handleAction);

    return (
        <Container>
            <Timeline stages={prepareColors(Stages)}></Timeline>
        </Container>
    );
};

export default CustomerPage;