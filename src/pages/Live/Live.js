import { useEffect } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "~/redux/layoutSlice";

function Live() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [])
    return ( <h2>Live</h2> );
}

export default Live;