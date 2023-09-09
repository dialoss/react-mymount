import {useState} from "react";

export const useFetching = function(callback) {
    const [loading, setLoading] = useState(true);

    const fetching = async () => {
        try {
            setLoading(true);
            await callback();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return [fetching, loading];
}