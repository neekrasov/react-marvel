import CharacterRandom from '../components/CharacterRandom/CharacterRandom'
import CharacterList from "../components/CharacterList/CharacterList";
import CharacterInfo from "../components/CharacterInfo/CharacterInfo";

import ironMan from '../img/iron-man.png';
import captainMarvel from '../img/captain-marvel.png';
import { useState } from "react";
import Helmet from 'react-helmet';
import { CharacterSearchForm } from '../components/CharacterSearchForm/CharacterSearchForm';
export const CharacterPage = () => {
    const [selectedChar, setSelectedChar] = useState(0)
    const [scrollRef, setScrollRef] = useState(null);
    const [filterCharacters, setFilterCharacters] = useState([]);
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Basic information about the characters"
                />
                <title> Marvel information portal</title>
            </Helmet>
            <CharacterRandom setScrollRef ={setScrollRef} />
            <div className="char__content">
                <CharacterList filterCharacters = {filterCharacters} setFilterCharacters = {setFilterCharacters} onCharSelected = {setSelectedChar} scrollRef ={scrollRef}/>
                <div>
                    <CharacterInfo selectedChar = {selectedChar}/>
                    <CharacterSearchForm setFilterCharacters = {setFilterCharacters}/>
                </div>
            </div>
            <img className="bg-decoration iron-man" src={ironMan} alt="iron-man"/>
            <img className="bg-decoration captain-marvel" src={captainMarvel} alt="captain-marvel"/>
        </>
    )
}