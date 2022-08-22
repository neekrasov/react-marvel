import CharacterRandom from '../components/CharacterRandom/CharacterRandom'
import CharacterList from "../components/CharacterList/CharacterList";
import CharacterInfo from "../components/CharacterInfo/CharacterInfo";

import ironMan from '../img/iron-man.png';
import captainMarvel from '../img/captain-marvel.png';
import { useState } from "react";
export const CharacterPage = () => {
    const [selectedChar, setSelectedChar] = useState(0)
    return (
        <>
            <CharacterRandom/>
            <div className="char__content">
                <CharacterList onCharSelected = {setSelectedChar}/>
                <CharacterInfo selectedChar = {selectedChar}/>
            </div>
            <img className="bg-decoration iron-man" src={ironMan} alt="iron-man"/>
            <img className="bg-decoration captain-marvel" src={captainMarvel} alt="captain-marvel"/>
        </>
    )
}