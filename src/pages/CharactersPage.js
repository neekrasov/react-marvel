import CharacterRandom from '../components/CharacterRandom/CharacterRandom'
import CharacterList from "../components/CharacterList/CharacterList";
import CharacterInfo from "../components/CharacterInfo/CharacterInfo";

import ironMan from '../img/iron-man.png';
import captainMarvel from '../img/captain-marvel.png';
import { useState } from "react";
export const CharacterPage = () => {
    const [selectedChar, setSelectedChar] = useState(0)
    const [scrollRef, setScrollRef] = useState(null);
    return (
        <>
            <CharacterRandom setScrollRef ={setScrollRef} />
            <div className="char__content">
                <CharacterList onCharSelected = {setSelectedChar} scrollRef ={scrollRef}/>
                <CharacterInfo selectedChar = {selectedChar}/>
            </div>
            <img className="bg-decoration iron-man" src={ironMan} alt="iron-man"/>
            <img className="bg-decoration captain-marvel" src={captainMarvel} alt="captain-marvel"/>
        </>
    )
}