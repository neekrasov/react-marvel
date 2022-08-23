import { Link, NavLink } from 'react-router-dom';
import './Header.sass';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>

            <h2 className='app__link-to-marvel'>
                <a href='https://developer.marvel.com/'>
                    Data provided by Marvel. © 2014 Marvel
                </a>
            </h2>

            <nav className="app__menu">
                <ul>
                    <li><NavLink to="/" style={({isActive}) => isActive ? {color: "#9F0013"}: undefined}>Characters</NavLink></li>
                    /
                    <li><NavLink to="/comics" style={({isActive}) => isActive ? {color: "#9F0013"}: undefined}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;