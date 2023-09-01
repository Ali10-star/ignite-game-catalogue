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


    const tagStyling = {
        color: `#${game.dominant_color}`,
        backgroundColor: `#${game.dominant_color}10`,
    }

    return (
        <>
        {!isLoading && (
            <CardShadow className='shadow' onClick={exitDetailHandler}>
                <Detail layoutId={pathId}>
                    <Stats>
                        <Rating>
                            <motion.h3 layoutId={`title ${game.id.toString()}`}>{game.name}</motion.h3>
                            <span className='release'>Released in {game.released.split("-")[0]}</span>
                            <span className="rating"><p>Rating: {game.rating}</p>{getStars()}</span>
                            <Genres>
                                {game.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}
                            </Genres>
                        </Rating>
                        <Info>
                            <h3>Platforms</h3>
                            <Platforms>
                                {game.platforms.map(data => (
                                    <PlatformPill>
                                        <img key={data.platform.id} src={getPlatformIcon(data.platform.name)} alt="" />
                                        <h5 key={data.platform.id}>{data.platform.name}</h5>
                                    </PlatformPill>
                                ))}
                            </Platforms>
                        </Info>
                    </Stats>

                    <Media>
                        <motion.img layoutId={`image ${game.id.toString()}`} src={resizeImage(game.background_image, 1280)} alt="" />
                    </Media>

                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '0.5rem'}}>
                        <Developers>
                            <h4>Developed By</h4>
                            <div className="devs">
                                {game.developers.map(dev => <span key={dev.id}>{dev.name}</span>)}
                            </div>
                        </Developers>

                        <Publishers>
                            <h4>Published By</h4>
                            <div className="pubs">
                                {game.publishers.map(pub => <span key={pub.id}>{pub.name}</span>)}
                            </div>
                        </Publishers>
                    </div>

                    <Description>
                        <h3>Overview</h3>
                        {/* <p>{game.description_raw}</p> */}
                        <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
                    </Description>

                    <Tags>
                        {game.tags.map(tag => tag.language === 'eng' && <span style={tagStyling} key={tag.id} >{tag.name}</span> )}
                    </Tags>

                    <h3>Game Screenshots</h3>
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
    @media screen and (max-width: 767px) {
        padding-bottom: 1rem;
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

    span.release {
        color: #676767;
        font-weight: lighter;
        font-size: 0.9rem;
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

const Genres = styled(motion.div)`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    font-style: italic;
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
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    transition: all 0.3s ease;
    height: 2.8rem;

    h5 {
        color: white;
        width: 2.8rem;
        font-size: 0.8rem;
        word-wrap: break-word;
        display: none;
        cursor: default;
    }

    img {
        height: 2.8rem;
        width: 2.8rem;
        object-fit: contain;
    }

    &:hover {
        background-color: #ff7676;
        img {
            display: none;
        }
        h5 {
            display: inline;
        }
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

const Developers = styled(motion.div)`
    padding-top: 2rem;

    h4 {
        color: #ff7676;
        font-weight: 500;
    }
    .devs {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: 0.8rem;
        color: #676767;
    }
    `;

const Publishers = styled(motion.div)`
    padding-top: 2rem;

    h4 {
        color: #ff7676;
        font-weight: 500;
    }
    .pubs {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: 0.8rem;
        color: #676767;
    }
`;

const Description = styled(motion.div)`
    margin: 3rem 0rem;

    p {
        font-size: 1em;
    }
`;

const Tags = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    span {
        border-radius: 10px;
        font-size: 0.8rem;
        padding: 0.3rem;
        border: none;
        color: blue;
        cursor: default;
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
