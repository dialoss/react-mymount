import React from 'react';
import Container from "ui/Container/Container";
import Timeline from "components/Timeline/Timeline";
import {prepareColors, Stages} from "./stages";

const CustomerPage = () => {
    return (
        <Container>
            <Timeline stages={prepareColors(Stages)}></Timeline>
        </Container>
    );
};

export default CustomerPage;