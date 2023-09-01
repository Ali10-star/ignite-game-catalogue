import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import loadDetail from '../actions/detailsAction';
import { resizeImage } from '../util';
import { popup } from '../animations';

const Game = ({ game }) => {
    const dispatch = useDispatch();

    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";
        dispatch(loadDetail(game.id));
    };

    return (
        <Link to={`/game/${game.id}`}>
        <StyledGame variants={popup} initial="hidden" animate="show" layoutId={game.id.toString()} onClick={loadDetailHandler}>
                <motion.h3 layoutId={`title ${game.id.toString()}`}>{ game.name }</motion.h3>
                <p>{ game.released }</p>
                <motion.img layoutId={`image ${game.id.toString()}`} src={resizeImage(game.background_image, 640)} alt={game.name} />
        </StyledGame>
        </Link>
    );
};

const StyledGame = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ghostwhite;
    min-height: 30vh;
    max-height: 50vh;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    h3 {
        max-width: 50ch;
        font-size: 1rem;
    }

    p {
        font-size: 1rem;
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
    }

    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`;
export default Game;