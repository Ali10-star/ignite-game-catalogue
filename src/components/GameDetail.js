import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resizeImage } from '../util';
import playstation4 from '../img/playstation_4.svg';
import playstation5 from '../img/playstation_5.svg';
import apple from '../img/apple.svg';
import nintendo from '../img/nintendo.svg';
import xboxOne from '../img/xbox_one.svg';
import xboxSeriesX from '../img/xbox_seriesx.svg';
import steam from '../img/steam-logo.svg';
import gamepad from '../img/gamepad.svg';
import macOs from '../img/MacOS.svg';
import android from '../img/android.svg';

import starEmpty from '../img/star-empty.png';
import starFull from '../img/star-full.png';

const GameDetail = ({ pathId }) => {
    const { screenshots, game, isLoading } = useSelector((state) => state.rootReducer.detail);
    const navigate = useNavigate();

    const exitDetailHandler = (event) => {
        const element = event.target;
        if (element.classList.contains('shadow')) {
            document.body.style.overflow = 'auto';
            navigate('/');
        }
    }

    const getStars = () => {
        const stars = [];
        const rating = Math.round(game.rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img alt='star' src={starFull} key={i} />);
            } else {
                stars.push(<img alt='star' src={starEmpty} key={i} />);
            }
        }
        return stars;
    }

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case "PlayStation 4":
                return playstation4;
            case "PlayStation 5":
                return playstation5;
            case "Xbox Series S/X":
                return xboxSeriesX;
            case "Xbox One":
                return xboxOne;
            case "PC":
                return steam;
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            case "macOS":
                return macOs;
            case "Android":
                return android;
            default:
                return gamepad;
        }
    }


    return (
        <>
        {!isLoading && (
            <CardShadow className='shadow' onClick={exitDetailHandler}>
                <Detail layoutId={pathId}>
                    <Stats>
                        <Rating>
                            <motion.h3 layoutId={`title ${game.id.toString()}`}>{game.name}</motion.h3>
                            <span className="rating"><p>Rating: {game.rating}</p>{getStars()}</span>
                        </Rating>
                        <Info>
                            <h3>Platforms</h3>
                            <Platforms>
                                {game.platforms.map(data => (
                                    <PlatformPill>
                                    <img key={data.platform.id} src={getPlatformIcon(data.platform.name)} alt="" />
                                    </PlatformPill>
                                ))}
                            </Platforms>
                        </Info>
                    </Stats>

                    <Media>
                        <motion.img layoutId={`image ${game.id.toString()}`} src={resizeImage(game.background_image, 1280)} alt="" />
                    </Media>

                    <Description>
                        <p>{game.description_raw}</p>
                    </Description>

                    <h3>Game Screenshots:</h3>
                    <Gallery>
                        {screenshots.results.map(photo => (
                            <img key={photo.id} src={resizeImage(photo.image, 1280)} alt="" />
                        ))}
                    </Gallery>
                </Detail>
            </CardShadow>
        )}
        </>
    );
}

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgb(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ff7676;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    img {
        width: 100%;
    }

    @media screen and (max-width: 30rem) {
        width: 90%;
        left: 5%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: start;
    justify-content: space-between;
`;

const Rating = styled(motion.div)`
    h3 {
        color: #ff7676;
    }
    img {
        --size: 1rem;
        width: var(--size);
        height: var(--size);
        display: inline;

        @media screen and (max-width: 767px) {
            --size: 0.8rem;
        }
    }

    @media screen and (max-width: 767px) {
        p {
            font-size: 0.9rem;
        }
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
`;

const Info = styled(motion.div)`
    text-align: center;
    max-width: 50%;

    @media screen and (max-width: 767px) {
        max-width: 100%;
        margin-left: 2rem;
        margin-top: 0.5rem;
    }
`;

const Platforms = styled(motion.div)`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

`;

const PlatformPill = styled(motion.div)`
    background-color: ghostwhite;
    border-radius: 20px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    img {
        height: 2.5rem;
        width: 2.5rem;
        object-fit: contain;
    }
    @media screen and (max-width: 767px) {
        transform: scale(0.85);
    }
`;

const Media = styled(motion.div)`
    margin-top: 3rem;
    img {
        width: 100%;
        border-radius: 5px;
    }
`;

const Description = styled(motion.div)`
    margin: 3rem 0rem;

    p {
        font-size: 1em;
        @media screen and (max-width: 767px) {
            font-size: 0.8em;
        }
    }
`;

const Gallery = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    img {
        border-radius: 5px;
    }
`;

export default GameDetail;
