import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn } from "../animations";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";

const Home = () => {
    const location = useLocation();
    const pathId = location.pathname.split("/")[2];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    const { popular, newGames, upcoming, searched } = useSelector((state) => state.rootReducer.games);

    return (
        <GameList variants={fadeIn} initial="hidden" animate="show">
                <AnimatePresence>
                    {pathId && <GameDetail pathId={pathId} />}
                </AnimatePresence>

                {searched.length ? (
                <div className="search">
                    <h2>Search Results</h2>
                    <Games variants={fadeIn} initial="hidden" animate="show">
                        {searched.map(game => (<Game game={game} key={game.id}/>))}
                    </Games>
                </div>
                ) : ""}

                <h2>Popular Games</h2>
                <Games>
                    {popular.map(game => (<Game game={game} key={game.id}/>))}
                </Games>
                <h2>New Games</h2>
                <Games>
                    {newGames.map(game => (<Game game={game} key={game.id}/>))}
                </Games>
                <h2>Upcoming Games</h2>
                <Games>
                    {upcoming.map(game => (<Game game={game} key={game.id}/>))}
                </Games>
        </GameList>
    );
}

const GameList = styled(motion.div)`
    padding: 0rem 5rem;
    h2 {
        padding: 3rem 0rem;
    }
`;

const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 1rem;
`;

export default Home;