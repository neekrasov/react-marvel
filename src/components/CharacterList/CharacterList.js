import { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useMarvelAPI } from '../../services/api/MarvelAPI';
import {transitionStyles} from '../../styles/transitionStyles';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import './CharacterList.sass';

const CharList = ({filterCharacters, setFilterCharacters,  onCharSelected, scrollRef}) => {
    const [chars, setChars] = useState([]);
    const {isLoaded, isError, getAllCharacters} = useMarvelAPI();
    const [dataUpload, setDataUploadStatus] = useState(false);
    const [dataOffset, setDataOffset] = useState(303);
    const [lastCharacter, setLastCharacterStatus] = useState(false)

    useEffect(()=>onLoadCharacters(dataOffset, true), [])
    useEffect(()=>{
        if (filterCharacters.length !== 0 && !dataUpload){
            setChars(filterCharacters);
        };
    }, [filterCharacters])

    const onLoadCharacters = (offset, init) => {
        init? setDataUploadStatus(false): setDataUploadStatus(true)
        
        getAllCharacters(offset).then(result => {
            if (result.length === 0){
                setLastCharacterStatus(true);
                return;
            }
            setChars([...chars.filter((item) => item.id !== filterCharacters[0]?.id), ...result]);
            setFilterCharacters([]);
            setDataOffset(dataOffset + 9);
            setDataUploadStatus(false);
        })
    }
    const loadButtonStyle = lastCharacter? {display: 'none'} : null
    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadSpinner = !isLoaded &&  !dataUpload? <><li/><LoadSpinner/><li/></> : null;
    const charListItems = chars.map((char) => <CharacterListItem onCharSelected = {onCharSelected} scrollRef = {scrollRef} key = {char.id} char = {char} />);

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

const CharacterListItem = ({scrollRef, onCharSelected, char, id}) => {
    const [animationStatus, setAnimationStatus] = useState(false);
    const itemRef = useRef(null);
    setTimeout(()=> setAnimationStatus(true), 50);
    const scrollToRef = () => scrollRef.current.scrollIntoView();
    const setSelected = () => itemRef.current.focus();
    let charPreviewStyle = char.charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null;

    return (
        <Transition in={animationStatus} timeout={500}>
            {state =>
                    <li 
                        style = {{
                            ...transitionStyles[state]
                        }} 
                        ref={itemRef} 
                        onClick={()=> {
                            onCharSelected(char);
                            setSelected();
                            scrollToRef();
                        }}
                        className={`char__item`}
                        tabIndex={0}>

                        <img style = {charPreviewStyle} src={char.charPreview} alt="abyss"/>
                        <div className="char__name">{char.charName}</div>
                    </li>
        }                     
        </Transition>
    )
}
export default CharList;