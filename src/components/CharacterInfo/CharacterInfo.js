import { useEffect, useState, useRef } from "react";
import {useMarvelAPI} from "../../services/api/MarvelAPI";
import './CharacterInfo.sass';
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeletn from "../Skeletn/Skeletn";
import { Link } from "react-router-dom";


const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState(null);
    const {isLoaded, isError, getCharacter} = useMarvelAPI();

    useEffect(()=>{
        getCharacter(selectedChar).then(result => setChar(result));
    }, [selectedChar])

    const errorMessage = isError && char? <ErrorMessage style ={{width: "370px", height: "260px"}}/> : null;
    const loadSpinner = !isLoaded && char? <LoadSpinner/> : null;
    const skeletn = loadSpinner || errorMessage || char ? null: <Skeletn/>;
    const content = !(loadSpinner || errorMessage || !char) ? <CharInfoView {...char}/> : null;

    return (
        <div className="char__info">
            {skeletn}
            {errorMessage}
            {loadSpinner}
            {content}
        </div>
    )
}

const CharInfoView = ({charName, charDescription, charPreview, homepageLink, wikiLink, comics}) =>{
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: "contain"} : null
    return (
        <>
            <div className="char__basics">
                <img src={charPreview} alt="abyss" style={charPreviewStyle}/>
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