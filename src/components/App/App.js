import AppHeader from "../Header/Header";
import RandomChar from "../CharacterRandom/CharacterRandom";
import CharList from "../CharacterList/CharacterList";
import CharInfo from "../CharacterInfo/CharacterInfo";

import ironMan from '../../img/iron-man.png';
import captainMarvel from '../../img/captain-marvel.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration iron-man" src={ironMan} alt="iron-man"/>
                <img className="bg-decoration captain-marvel" src={captainMarvel} alt="captain-marvel"/>
            </main>
        </div>
    )
}

export default App;