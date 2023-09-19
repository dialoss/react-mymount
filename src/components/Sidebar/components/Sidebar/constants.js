export const SidebarStates = {
    true: {
        btn_open: {
            visibility: "hidden"
        },
        btn_close: {
            visibility: "visible"
        },
        wrapper: {
            transform: "translate(0, 0)",
            visibility: "visible",
        }
    },
    false: {
        btn_open: {
            visibility: "visible"
        },
        btn_close: {
            visibility: "hidden"
        },
        wrapper: {
            transform: "translate(-100%, 0)",
            visibility: "hidden",
        }
    }
}