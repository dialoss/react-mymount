import React from 'react';
import CarouselNavArrow from "./CarouselNavArrow";

const CarouselNavbar = ({side}) => {
    return (
        <div className="carousel__nav-bar">
            <CarouselNavArrow direction={side}></CarouselNavArrow>
        </div>
    );
};

export default CarouselNavbar;