export function ListStyle(opened) {
    const styles = {
        true: {
            maxHeight: "1000px",
            // visibility: "visible"
            // marginTop: "4px",
        },
        false: {
            maxHeight: "0",
            // visibility: "hidden"
            // marginTop: "0",
        }
    }
    return styles[opened];
}