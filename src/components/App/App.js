import AppHeader from "../Header/Header";
import RandomChar from "../CharacterRandom/CharacterRandom";
import CharList from "../CharacterList/CharacterList";
import CharInfo from "../CharacterInfo/CharacterInfo";

import decoration from '../../img/vision.png';

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
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;