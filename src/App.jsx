import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home/Home.jsx';
import GameDetails from './pages/GameDetails/GameDetails.jsx';
import DeveloperDetails from './pages/DeveloperDetails/DeveloperDetails.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/developer/:id" element={<DeveloperDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;