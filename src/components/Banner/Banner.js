import './Banner.sass';
import avengers from '../../img/avengers.png';
import avengersLogo from '../../img/avengers_logo.png';

const Banner = () => {
    return (
        <div className="app__banner">
            <img src={avengers} alt="avengers"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default Banner;