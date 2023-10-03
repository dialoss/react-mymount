import React from 'react';
import Container from "ui/Container/Container";
import Timeline from "components/Timeline/Timeline";
import {prepareColors, Stages} from "./stages";
import MessengerContainer from "modules/Messenger/MessengerContainer";

const CustomerPage = () => {
    return (
        <Container>
            <Timeline stages={prepareColors(Stages)}></Timeline>
            <MessengerContainer></MessengerContainer>
        </Container>
    );
};

export default CustomerPage;