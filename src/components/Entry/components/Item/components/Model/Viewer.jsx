import React from 'react';
import MyCanvas from "./Canvas";

const Viewer = ({data}) => {
    return (
        <MyCanvas data={data}>
        </MyCanvas>
    );
};

export default Viewer;