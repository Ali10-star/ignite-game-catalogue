// FETCH_GAMES
import axios from "axios";
import { popularGamesURL, upcomingGamesURL, newGamesURL, gameSearchURL } from "../api";

export const loadGames = () => async (dispatch) => {
    const popularGamesData = await axios.get(popularGamesURL());
    const upcomingGamesData = await axios.get(upcomingGamesURL());
    const newGamesData = await axios.get(newGamesURL());

    dispatch({
        type: "FETCH_GAMES",
        payload: {
            popular: popularGamesData.data.results,
            upcoming: upcomingGamesData.data.results,
            newGames: newGamesData.data.results,
        }
    });
};

export const searchGames = (searchQuery) => async (dispatch) => {
    const searchGamesData = await axios.get(gameSearchURL(searchQuery));
    dispatch({
        type: "SEARCH_GAMES",
        payload: {
            searched: searchGamesData.data.results
        }
    });
}