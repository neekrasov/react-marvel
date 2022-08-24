import { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useMarvelAPI } from '../../services/api/MarvelAPI';
import {transitionStyles} from '../../styles/transitionStyles';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import './CharacterList.sass';

const CharList = ({onCharSelected, scrollRef}) => {
    const [chars, setChars] = useState([]);
    const {isLoaded, isError, getAllCharacters} = useMarvelAPI();
    const [dataUpload, setDataUploadStatus] = useState(false);
    const [dataOffset, setDataOffset] = useState(301);
    const [lastCharacter, setLastCharacterStatus] = useState(false)

    useEffect(()=>onLoadCharacters(dataOffset, true), [])

    const onLoadCharacters = (offset, init) => {
        init? setDataUploadStatus(false): setDataUploadStatus(true)
        
        getAllCharacters(offset).then(result => {
            if (result.length === 0){
                setLastCharacterStatus(true);
                return;
            }
            setChars([...chars, ...result]);
            setDataOffset(dataOffset + 9);
            setDataUploadStatus(false);
        })
    }
    const loadButtonStyle = lastCharacter? {display: 'none'} : null
    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadSpinner = !isLoaded &&  !dataUpload? <><li/><LoadSpinner/><li/></> : null;
    const charListItems = chars.map((char) => <CharacterListItem onCharSelected = {onCharSelected} scrollRef = {scrollRef} key = {char.id} {...char} />);

    return (
        <div className="char__list">
            <Transition in={isLoaded} timeout={500}>
                {state => 
                    <ul 
                    className="char__grid"
                    style = {{
                        ...transitionStyles[state]
                    }}>
                        {errorMessage}
                        {loadSpinner}
                        {charListItems}
                    </ul>
                }
            </Transition>
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

const CharacterListItem = ({scrollRef, onCharSelected, charPreview, charName, id}) => {
    const itemRef = useRef(null);
    const scrollToRef = () => scrollRef.current.scrollIntoView();
    const setSelected = () => itemRef.current.focus();
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null;

    return (
            <li 
                ref={itemRef} 
                onClick={()=> {
                    onCharSelected(id);
                    setSelected();
                    scrollToRef();
                }}
                className={`char__item`}
                tabIndex={0}>

                <img style = {charPreviewStyle} src={charPreview} alt="abyss"/>
                <div className="char__name">{charName}</div>
            </li>
    )
}
export default CharList;