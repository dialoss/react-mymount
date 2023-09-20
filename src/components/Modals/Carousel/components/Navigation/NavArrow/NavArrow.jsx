import React from 'react';
import rightArrow from './right.svg';
import {changeCarousel} from "../../../controller";

const CarouselNavArrow = ({side}) => {
    return (
        <button className={"carousel__nav-btn"} onClick={() => changeCarousel(side)}>
            <img src={rightArrow} alt=""/>
        </button>
    );
};

export default CarouselNavArrow;