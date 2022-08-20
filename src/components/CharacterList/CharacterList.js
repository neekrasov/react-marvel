import { useState, useEffect, useRef } from 'react';
import MarvelAPI from '../../services/api/MarvelAPI';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import './CharacterList.sass';

const CharList = ({onCharSelected}) => {
    const [chars, setChars] = useState([]);
    const [isLoaded, setLoadedStatus] = useState(false);
    const [isError, setErrorStatus] = useState(false);
    const [dataUpload, setDataUploadStatus] = useState(false);
    const [dataOffset, setDataOffset] = useState(301);
    const [lastCharacter, setLastCharacterStatus] = useState(false)


    useEffect(()=>{
        onLoadCharacters();
    }, [])

    const onLoadCharacters = (offset) => {
        const api = new MarvelAPI();
        setDataUploadStatus(true);
        api.getAllCharacters(offset).then(result => {
            setLoadedStatus(true);
            if (result.length === 0){
                setLastCharacterStatus(true);
                return;
            }
            setChars([...chars, ...result]);
            setErrorStatus(false);
            setDataUploadStatus(false)
            setDataOffset(dataOffset + 9)
        }).catch(()=>{
            setLoadedStatus(false);
            setErrorStatus(true);
        })
    }
    const loadButtonStyle = lastCharacter? {display: 'none'} : null
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
            <button 
            style ={loadButtonStyle}
            className="button button__main button__long"
            onClick ={()=> onLoadCharacters(dataOffset)}
            disabled = {dataUpload}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharacterListItem = ({onCharSelected, charPreview, charName, id}) => {
    const itemRef = useRef(null)
    const setSelected = () => itemRef.current.focus();
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null
    return (
        <li ref={itemRef} 
            onClick={()=> {
            onCharSelected(id);
            setSelected();
            }}
            className={`char__item`}
            tabIndex={0}>
            <img style = {charPreviewStyle} src={charPreview} alt="abyss"/>
            <div className="char__name">{charName}</div>
        </li>
    )
}
export default CharList;