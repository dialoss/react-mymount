import React, {useEffect, useState} from 'react';
import Carousel from "./components/Carousel/Carousel.jsx";
import useKeypress from "react-use-keypress";
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";

function bounds(n, bound) {
    return (n + bound) % bound;
}

const CarouselContainer = ({items, currentItem}) => {
    let currentWrapper = 0;
    const [current, setCurrent] = useState(() => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === currentItem) {
                return i;
            }
        }
    });
    const forward = () => {
        currentWrapper += 1;
        setCurrent(bounds(currentWrapper, items.length));
    }
    const back = () => {
        currentWrapper -= 1;
        setCurrent(bounds(currentWrapper, items.length));
    }

    useAddEvent("carousel-right", forward);
    useAddEvent("carousel-left", back);

    useEffect(() => {
        items.forEach(item => new Image().src = item.image);
    }, [items]);

    useKeypress('ArrowRight', () => triggerEvent('carousel-right'));
    useKeypress('ArrowLeft', () => triggerEvent('carousel-left'));
    return (
        <Carousel item={items[current]}/>
    );
};

export default CarouselContainer;