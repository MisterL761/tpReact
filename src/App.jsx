import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home/Home.jsx';
import GameDetails from './pages/GameDetails/GameDetails.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;