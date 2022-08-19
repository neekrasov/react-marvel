import { useState, useEffect } from 'react';
import MarvelAPI from '../../services/api/MarvelAPI';
import './CharacterList.sass';

const CharList = () => {

    const [chars, setChars] = useState([]);

    useEffect(()=>{
        const api = new MarvelAPI();
        api.getAllCharacters().then(result => setChars(result))
    }, [])

    return (
        <div className="char__list">
            <ul className="char__grid">
                {chars.map((char)=> <CharacterListItem {...char}/>)}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharacterListItem = ({charPreview, charName}) => {
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {'object-fit': "contain"} : null
    return (
        <li className="char__item">
            <img style = {charPreviewStyle} src={charPreview} alt="abyss"/>
            <div className="char__name">{charName}</div>
        </li>
    )
}

export default CharList;