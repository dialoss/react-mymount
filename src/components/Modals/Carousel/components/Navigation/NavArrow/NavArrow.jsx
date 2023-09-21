import React, {useCallback} from 'react';
import rightArrow from './right.svg';
import {triggerEvent} from "helpers/events";

const CarouselNavArrow = ({side}) => {
    const callback = useCallback(() => triggerEvent('carousel-' + side), []);
    return (
        <button className={"carousel__nav-btn"} onClick={callback}>
            <img src={rightArrow} alt=""/>
        </button>
    );
};

export default CarouselNavArrow;