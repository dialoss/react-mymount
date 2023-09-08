import React from 'react';
import CarouselNavArrow from "./CarouselNavArrow";
import CarouselNavbar from "./CarouselNavbar";

const CarouselNav = () => {
    return (
        <div className="carousel__nav">
            <CarouselNavbar side={1}></CarouselNavbar>
            <CarouselNavbar side={-1}></CarouselNavbar>
        </div>
    );
};

export default CarouselNav;