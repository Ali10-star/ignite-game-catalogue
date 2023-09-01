import axios from "axios";
import { gameDetailsURL, gameScreenshotsURL } from "../api";

const loadDetail = (id) => async (dispatch) => {

    dispatch({
        type: "LOADING_DETAILS",
    });

    const detailData = await axios.get(gameDetailsURL(id));
    const screenshotsData = await axios.get(gameScreenshotsURL(id));

    dispatch({
        type: "GET_DETAILS",
        payload: {
            game: detailData.data,
            screenshots: screenshotsData.data
        }
    })
};

export default loadDetail;