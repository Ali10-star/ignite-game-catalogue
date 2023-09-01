import { useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../img/logo.svg';

import { searchGames } from '../actions/gamesAction';
import { fadeIn } from '../animations';
import { useDispatch } from 'react-redux';

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");

    const searchInputHandler = (event) => {
        setTextInput(event.target.value);
    }

    const searchSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(searchGames(textInput));
        setTextInput("");
    }

    const clearSearched = () => {
        dispatch({type: "CLEAR_SEARCHED"});
    }

    return (
        <StyledNav variants={fadeIn} initial="hidden" animate="show">
        <Logo onClick={clearSearched}>
            <img src={logo} alt="logo" />
            <h1>Ignite</h1>
        </Logo>
        <form className="search">
            <input type="text" onChange={searchInputHandler} value={textInput} />
            <button type='submit' onClick={searchSubmitHandler}>Search</button>
        </form>
        </StyledNav>
    );
}

const StyledNav = styled(motion.div)`
    padding: 3rem 5rem;
    text-align: center;
    @media screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        width: 30%;
        margin: 0 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
        outline: none;
        transition: all 0.3s ease;
        &:focus {
            color: #ff7676;
            outline: #ff7676;
            box-shadow: 0px 0px 30px rgba(255, 76, 76, 0.2);
        }
        @media screen and (max-width: 767px) {
            width: 90%;
            margin-bottom: 1rem;
        }
    }
    button {
        cursor: pointer;
        font-size: 1.5rem;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 2rem;
        transition: all 0.3s ease;
        background-color: #ff7676;
        color: white;

        &:hover {
            background-color: white;
            color: #ff7676;
            border: 1px solid #ff7676;
        }
    }
    `;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.4s ease;

    img {
        width: 2rem;
        height: 2rem;
    }
    &:hover {
        color: #ff7676;
    }
`;


export default Nav;