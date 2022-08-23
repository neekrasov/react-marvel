import './SingleComicPage.sass';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMarvelAPI } from '../../services/api/MarvelAPI';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export const SingleComicPage = () => {
    const [comic, setComic] = useState({});
    const {comicID} = useParams();
    const {isLoaded, isError, getComic} = useMarvelAPI();
    
    useEffect(()=>{
        getComic(comicID).then(result => setComic(result));
    }, [comicID])

    const loadSpinner = !isLoaded ? <><li/><LoadSpinner/><li/></> : null;
    const errorMessage = isError ? <ErrorMessage/> : null;
    const contentComic = !(loadSpinner || errorMessage) ? <SingleComicPageView {...comic}/> : null;

    return (
        <>
            {loadSpinner}
            {errorMessage}
            {contentComic}
        </>

    )
}


const SingleComicPageView = ({title, description, pageCount, language, price, thumbnail}) => {
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="/#" className="single-comic__back">Back to all</a>
        </div>
    )
}