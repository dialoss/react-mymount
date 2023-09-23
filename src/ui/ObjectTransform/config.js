import styles from "./components/styles/resize.module.scss";
console.log(styles)
export const Transforms = {
    parent: {
        name: "move",
        style: {},
    },
    child: {
        resize: {
            buttons: [
                {
                    name: 'resize-left',
                    style: styles['resize-left'],
                },
                {
                    name: 'resize-right',
                    style: styles['resize-right'],
                },
            ],
        }
    }
};