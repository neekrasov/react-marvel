import Header from "../Header/Header";
import CharacterRandom from "../CharacterRandom/CharacterRandom";
import CharacterList from "../CharacterList/CharacterList";
import CharacterInfo from "../CharacterInfo/CharacterInfo";

import ironMan from '../../img/iron-man.png';
import captainMarvel from '../../img/captain-marvel.png';
import { useState } from "react";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(0)

    return (
        <div className="app">
            <Header/>
            <main>
                <CharacterRandom/>
                <div className="char__content">
                    <CharacterList onCharSelected = {setSelectedChar}/>
                    <CharacterInfo selectedChar = {selectedChar}/>
                </div>
                <img className="bg-decoration iron-man" src={ironMan} alt="iron-man"/>
                <img className="bg-decoration captain-marvel" src={captainMarvel} alt="captain-marvel"/>
            </main>
        </div>
    )
}

export default App;