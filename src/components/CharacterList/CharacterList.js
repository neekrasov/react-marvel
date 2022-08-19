import { useState, useEffect } from 'react';
import MarvelAPI from '../../services/api/MarvelAPI';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import './CharacterList.sass';

const CharList = ({onCharSelected}) => {
    const [chars, setChars] = useState([]);
    const [isLoaded, setLoadedStatus] = useState(false);
    const [isError, setErrorStatus] = useState(false);
    
    useEffect(()=>{
        const api = new MarvelAPI();
        api.getAllCharacters().then(result => {
            setChars(result);
            setLoadedStatus(true);
            setErrorStatus(false);
        }).catch(()=>{
            setLoadedStatus(false);
            setErrorStatus(true);
        })
    }, [])

    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadSpinner = !isLoaded ? <><li/><LoadSpinner/><li/></> : null;
    const charListItems = !(loadSpinner || errorMessage) ? chars.map((char) =>
                                                    <CharacterListItem onCharSelected = {onCharSelected}
                                                                        key={char.id} 
                                                                        {...char}/>) : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {loadSpinner}
                {charListItems}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharacterListItem = ({onCharSelected,charPreview, charName, id}) => {
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null
    return (
        <li onClick={() => onCharSelected(id)} className="char__item">
            <img style = {charPreviewStyle} src={charPreview} alt="abyss"/>
            <div className="char__name">{charName}</div>
        </li>
    )
}
export default CharList;