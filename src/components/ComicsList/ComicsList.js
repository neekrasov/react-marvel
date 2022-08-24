import './ComicsList.sass';
import { useEffect, useState } from 'react';
import { useMarvelAPI } from '../../services/api/MarvelAPI';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { transitionStyles } from '../../styles/transitionStyles';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [dataOffset, setDataOffset] = useState(301);
    const {isLoaded, getAllComics} = useMarvelAPI();
    const [dataUpload, setDataUploadStatus] = useState(false);
    const [lastComicsStatus, setLastComicsStatus] = useState(false)

    useEffect(()=>onLoadComics(dataOffset, true), [])

    const onLoadComics = (offset, init) => {
        init? setDataUploadStatus(false): setDataUploadStatus(true)
        
        getAllComics(offset).then(result => {
            if (result.length === 0){
                setLastComicsStatus(true);
                return;
            }
            setComics([...comics, ...result]);
            setDataOffset(dataOffset + 9);
            setDataUploadStatus(false);
        })
    }


    const loadButtonStyle = lastComicsStatus? {display: 'none'} : null
    const loadSpinner = !isLoaded &&  !dataUpload? <div><LoadSpinner/></div> : null;
    const comicsListItems = !(loadSpinner) ? comics.map((comic, index) =>
                                                    <ComicsListItem key={index}
                                                    isLoaded = {isLoaded}
                                                    dataUpload = {dataUpload}
                                                    {...comic}/>) : null;

    return (
        <div className='comics__list'>
            {loadSpinner? loadSpinner : <ul className="comics__grid"> {comicsListItems}</ul>}
            <button onClick={() => onLoadComics(dataOffset)} disabled = {dataUpload} style = {loadButtonStyle} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;


const ComicsListItem = ({title, price, thumbnail, id}) => {

    const [animationStatus, setAnimationStatus] = useState(false);
    setTimeout(()=> setAnimationStatus(true), 50);

    return (
        <Transition in={animationStatus} timeout={500}>
            {state => 
                <li 
                className="comics__item"
                style = {{
                    ...transitionStyles[state]
                }} >
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            }
        </Transition>

    )
}