const baseUrl = "https://api.rawg.io/api/";
const API_KEY = '061ea7ee452047ada59fe84b165857f1'; // query param: key

const getCurrentDate = () => {
    const date = new Date();

    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;

    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    const year = date.getFullYear();

    return { day, month, year };
};

const { day, month, year } = getCurrentDate();
const todaysDate = `${year}-${month}-${day}`;
const lastYear = `${year - 1}-${month}-${day}`;
const nextYear = `${year + 1}-${month}-${day}`


const popularGames = `games?key=${API_KEY}&dates=${lastYear},${todaysDate}&ordering=-metacritic&page_size=50`;
const upcomingGames = `games?key=${API_KEY}&dates=${todaysDate},${nextYear}&ordering=-added&page_size=20`;
const newGames = `games?key=${API_KEY}&dates=${lastYear},${todaysDate}&ordering=-released&page_size=20`;

export const popularGamesURL = () => `${baseUrl}${popularGames}`;
export const upcomingGamesURL = () => `${baseUrl}${upcomingGames}`;
export const newGamesURL = () => `${baseUrl}${newGames}`;
export const gameDetailsURL = (gameId) => `${baseUrl}games/${gameId}?key=${API_KEY}`;
export const gameScreenshotsURL = (gameId) => `${baseUrl}games/${gameId}/screenshots?key=${API_KEY}`;
export const gameSearchURL = (searchQuery) => `${baseUrl}games?key=${API_KEY}&search=${searchQuery}&page_size=10`;