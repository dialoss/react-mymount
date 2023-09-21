import React, {useLayoutEffect, useState} from 'react';
import Carousel from "./components/Carousel/Carousel.jsx";
import useKeypress from "react-use-keypress";
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";
import {useSelector} from "react-redux";
import {ModalManager} from "components/ModalManager";

function bounds(n, bound) {
    return (n + bound) % bound;
}

const CarouselContainer = () => {
    const entrys = useSelector(state => state.entrys.entrys);
    let items = [];

    const [currentItem, setCurrent] = useState(0);
    let currentWrapper = 0;
    const forward = () => {
        currentWrapper += 1;
        setCurrent(bounds(currentWrapper, items.length));
    }
    const back = () => {
        currentWrapper -= 1;
        setCurrent(bounds(currentWrapper, items.length));
    }

    function openCarousel(event) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === event.detail) {
                setCurrent(i);
                triggerEvent('carousel', {isOpened: true});
                return;
            }
        }
    }

    useAddEvent("open-carousel", openCarousel);
    useAddEvent("carousel-right", forward);
    useAddEvent("carousel-left", back);

    useLayoutEffect(() => {
        // items.forEach(item => new Image().src = item.image);
        entrys.forEach(entry => {
            entry.items.forEach(item => {
                items.push({
                    image: item.img,
                    info: {
                        title: item.title || entry.title,
                        description: item.description || entry.description,
                        filename: item.file,
                    }
                });
            })
        })
    }, [entrys]);

    useKeypress('ArrowRight', () => triggerEvent('carousel-right'));
    useKeypress('ArrowLeft', () => triggerEvent('carousel-left'));
    return (
        <>
            {
                !!items.length &&
                <ModalManager name={'carousel'}>
                    <Carousel style={{background: {}}} item={items[currentItem]}/>
                </ModalManager>
            }
        </>

    );
};

export default CarouselContainer;