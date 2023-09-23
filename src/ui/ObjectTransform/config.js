import styles from "components/styles/resize.scss";


export const Transforms = {
    move: {
        buttons: [
            {
                name: 'self',
                callback: () => {

                }
            }
        ],
        data: ['top', 'left']
    },
    resize: {
        buttons: [
            {
                name: 'resize-left',
                style: styles.resizeLeft,
                callback: () => {

                }
            },
            {
                name: 'resize-right',
                style: styles.resizeRight,
                callback: () => {

                }
            },
        ],
        data: ['top', 'left', 'maxWidth']
    }
};