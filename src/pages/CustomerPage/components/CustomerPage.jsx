import React, {useEffect} from 'react';
import Container from "ui/Container/Container";
import MyTimeline from "components/Timeline/Timeline";
import {Stages} from "./stages";

const CustomerPage = () => {

    useEffect(() => {

    }, []);
    return (
        <Container>
            <MyTimeline stages={Stages}></MyTimeline>
        </Container>
    );
};

export default CustomerPage;