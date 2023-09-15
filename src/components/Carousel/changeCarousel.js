import store from 'store/store';
import {changeModal} from "../Modal/changeModal";

export const changeCarousel = function(side, id=-1) {
    const state = store.getState();
    let current = state.modal['carousel'].currentSlide;
    const items = state.entrys.items;
    let position = 0;

    if (side !== "") {
        let dir = 1;
        if (side === "left") dir = -1;
        let n = items.length;
        let pos = current.position;
        pos += dir;
        pos = (pos + n) % n;
        position = pos;
    } else {
        items.forEach((item, index) => {
            if (item.id === id) {
                position = index;
            }
        })
    }
    const item = items[position];
    changeModal('carousel', {isOpened: true, currentSlide:
            {
                position,
                image: item.img,
                info: {
                    title: item.media_title,
                    description: item.media_description,
                    filename: item.file
                }
            }
    });
}