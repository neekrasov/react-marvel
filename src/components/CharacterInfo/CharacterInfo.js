import {useState} from "react";
import './CharacterInfo.sass';
import Skeletn from "../Skeletn/Skeletn";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { transitionStyles } from "../../styles/transitionStyles";


const CharInfo = ({selectedChar}) => {
    const [animationStatus, setAnimationStatus] = useState(false);
    setTimeout(()=> setAnimationStatus(true), 50);
    return (
        <Transition in={animationStatus} timeout={500} >
            {state =>         
                <div 
                className="char__info"
                style = {{
                    ...transitionStyles[state]
                }}>
                    {selectedChar ? <CharInfoView {...selectedChar}/> : <Skeletn/>}
                </div>}
        </Transition>

    )
}

const CharInfoView = ({charName, charDescription, charPreview, homepageLink, wikiLink, comics}) =>{
    return (
        <>
            <div className="char__basics">
                <img src={charPreview} alt="abyss" style={{objectFit: "contain"}}/>
                <div>
                    <div className="char__info-name">{charName}</div>
                    <div className="char__btns">
                        <a href={homepageLink} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiLink} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{charDescription}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list"> 
             {/* The amount of data in 10 pieces is limited by the MarvelAPI class */}
                {comics.length !== 0? comics.map(({name, resourceURI}, i) =>{
                    return (
                        <Link to={`/comics/${resourceURI.split('/').slice(-1)[0]}`} className="char__comics-item"
                            key={i}>
                           {name}
                        </Link>
                    )
                }): <li>The list of comics for this character will appear later!</li>
            }
            </ul>
        </>
    )
}

export default CharInfo;