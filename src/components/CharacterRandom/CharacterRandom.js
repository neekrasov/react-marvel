import './CharacterRandom.sass';
import mjolnir from '../../img/mjolnir.png';
import MarvelAPI from '../../services/api/MarvelAPI';
import {Component} from 'react';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

// Without hooks

class RandomChar extends Component{
    state={
        char: {},
        isLoaded: false,
        isError: false,
    }

    setRandomChar = () =>{
        const id = Math.floor(Math.random() * (1011334 - 1009742) + 1009742);
        this.setState({isLoaded: false, isError: false})
        new MarvelAPI()
            .getCharacter(id)
            .then((char)=>this.setState({char, isLoaded: true, isError: false}))
            .catch(()=>this.setState({char: {}, isError: true, isLoaded: true}))
    } 
    
    componentDidMount() {
         this.setRandomChar();
    }
    
    render() {
        const loadSpinner = !this.state.isLoaded? <LoadSpinner/> : null;
        const errorMessage = this.state.isError? <ErrorMessage/>: null;
        const characterView = !(loadSpinner || errorMessage) ? <CharacterView {...this.state.char}/> : null;
        return (
                <div className="randomchar">
                        {errorMessage}
                        {loadSpinner}
                        {characterView}
                    <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!<br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">
                            Or choose another one  1010881
                        </p>
                        <button onClick={this.setRandomChar} className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                    </div>
                </div>
        )
    }
    
}

//Dinamic element.

const CharacterView = ({charPreview, charName, charDescription, homepageLink, wikiLink}) => {
    charDescription = (charDescription)? charDescription : 'Information about this character will be later!';
    charDescription = charDescription.length > 220?  charDescription.slice(0, 220)+"..." : charDescription;
    let charPreviewStyle = charPreview === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {'object-fit': "contain"} : null
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