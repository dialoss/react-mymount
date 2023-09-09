import React from 'react';
import rightArrow from 'assets/svg/right.svg';

const CarouselNavArrow = ({direction}) => {
    return (
        <button>
            <img style={{transform:`scale(${direction})`}} src={rightArrow} alt=""/>
        </button>
    );
};

export default CarouselNavArrow;