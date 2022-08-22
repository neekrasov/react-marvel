import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CharacterPage, ComicsPage } from '../../pages';

import Header from "../Header/Header";



const App = () => {
    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Routes>
                        <Route path='/' element={<CharacterPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;