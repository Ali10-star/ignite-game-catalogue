import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailsReducer";

const initState = {
    name: '',
    isLogged: false,
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return {...state}
    }
};


const rootReducer = combineReducers({
    games: gamesReducer,
    detail: detailReducer
});

export default rootReducer;