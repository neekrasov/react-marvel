import {useEffect, useState, useRef} from 'react';
import {useMarvelAPI} from '../../services/api/MarvelAPI';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import './CharacterRandom.sass';
import mjolnir from '../../img/mjolnir.png';
import { Transition } from 'react-transition-group';
import { transitionStyles } from '../../styles/transitionStyles';

const RandomChar = ({setScrollRef}) => {
    const ref = useRef();
    const [char, setChar] = useState(null);
    const {isLoaded, isError, getCharacter, clearError} = useMarvelAPI();

    useEffect(()=>{
        clearError();
        setRandomChar();
        setScrollRef(ref);
    }, [])

    const setRandomChar = () => getCharacter(Math.floor(Math.random() * (1011334 - 1009742) + 1009742)).then(char=>setChar(char));
    
    const loadSpinner = !isLoaded? <LoadSpinner/> : null;
    const errorMessage = isError? <ErrorMessage style ={{width: "550px", height: "260px"}}/>: null;
    const characterView = !(loadSpinner || errorMessage) ? <CharacterView {...char}/> : null;


    return (
            <div ref ={ref} className="randomchar">
                <Transition in={isLoaded} timeout={500}>
                    {state=> 
                            <div
                            style = {{
                                ...transitionStyles[state]
                            }}>
                                {errorMessage}
                                {loadSpinner}
                                {characterView}
                            </div>
                    }
                </Transition>

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={setRandomChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
    )
    
}

const CharacterView = ({charPreview, charName, charDescription, homepageLink, wikiLink}) => {
    charDescription = (charDescription)? charDescription : 'Information about this character will be later!';
    charDescription = charDescription.length > 220?  charDescription.slice(0, 220)+"..." : charDescription;
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null
    return (
        <div className="randomchar__block">
            <img src={charPreview} alt="Random character" className="randomchar__img" style={charPreviewStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{charName}</p>
                <p className="randomchar__descr">{charDescription}</p>
                <div className="randomchar__btns">
                    <a href={homepageLink} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wikiLink} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;