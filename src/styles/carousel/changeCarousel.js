import {actions} from "store/reducers/modal";
import store from 'store/store';

export const changeCarousel = function() {
    const current = store.getState().modal['carousel'].currentImage;

}