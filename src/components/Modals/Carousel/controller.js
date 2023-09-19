import {useSelector} from "react-redux";
import store from 'store/store';
import {changeModal} from ""

const carouselState = useSelector(state => state.modal['carousel'].currentSlide);

const image = carouselState.image || "";
const info = carouselState.info || {};

export function changeCarousel(side, id=-1) {
    const state = store.getState();
    let current = state.modal['carousel'].currentSlide;
    const items = state.entrys.items;
    const entrys = state.entrys.entrys;
    let position = 0;
    let n = items.length;

    if (side !== "") {
        let dir = 1;
        if (side === "left") dir = -1;
        let pos = current.position;
        pos += dir;
        pos = (pos + n) % n;
        position = pos;
    } else {
        for (let i = 0; i < n; i++) {
            if (items[i].id === id) {
                position = i;
                break;
            }
        }
    }
    const item = items[position];
    let info = {
        title: item.title,
        description: item.description,
        filename: item.file
    }

    if (info.title.length === 0 && info.description.length === 0) {
        loop1:
            for (let j = 0; j < entrys.length; j++) {
                for (const item of entrys[j].items) {
                    if (item.id === items[position].id) {
                        info.title = entrys[j].title;
                        info.description = entrys[j].description;
                        break loop1;
                    }
                }
            }
    }

    changeModal('carousel', {isOpened: true, currentSlide:
            {
                position,
                image: item.img,
                info
            }
    });
}