import {useSelector} from "react-redux";

export function useUserAuth() {
    return useSelector(state => state.user.authorized);
}