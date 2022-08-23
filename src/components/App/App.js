import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CharacterPage, ComicsPage, Page404, SingleComicPage } from '../../pages';

import Header from "../Header/Header";



const App = () => {
    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Routes>
                        <Route path='/' element={<CharacterPage/>}/>
                        <Route path='comics' element={<ComicsPage/>}/> 
                        <Route path='/comics/:comicID' element ={<SingleComicPage/>}/>
                        <Route path='*' element = {<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;