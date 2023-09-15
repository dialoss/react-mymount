import React from 'react';
import rightArrow from 'assets/svg/right.svg';
import {changeCarousel} from "./changeCarousel";

const CarouselNavArrow = ({side}) => {
    return (
        <button className={"carousel__nav-btn"} onClick={() => changeCarousel(side)}>
            <img src={rightArrow} alt=""/>
        </button>
    );
};

export default CarouselNavArrow;