import { useEffect, useState } from "react";
import MarvelAPI from "../../services/api/MarvelAPI";
import './CharacterInfo.sass';
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeletn from "../Skeletn/Skeletn";


const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState(null);
    const [isLoaded, setLoadedStatus] = useState(false);
    const [isError, setErrorStatus] = useState(false);

    useEffect(()=>{
        if (selectedChar === 0) {
            setLoadedStatus(true);
            return;
        }
        setLoadedStatus(false)
        new MarvelAPI()
                .getCharacter(selectedChar)
                .then(result => {;
                    setChar(result);
                    setLoadedStatus(true);
                }).catch(()=>{
                    setLoadedStatus(true);
                    setErrorStatus(true);
                })
    }, [selectedChar])

    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadSpinner = !isLoaded ? <LoadSpinner/> : null;
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
                        <li className="char__comics-item"
                            key={i}>
                            <a href={resourceURI}>{name}</a> 
                        </li>
                    )
                }): <li>The list of comics for this character will appear later!</li>
            }
            </ul>
        </>
    )
}

export default CharInfo;