import { BrowserRouter, Routes, Route } from 'react-router';
import { CollectionProvider } from './context/CollectionContext.jsx';
import Home from './pages/Home/Home.jsx';
import GameDetails from './pages/GameDetails/GameDetails.jsx';
import DeveloperDetails from './pages/DeveloperDetails/DeveloperDetails.jsx';
import Collection from './pages/Collection/Collection.jsx';

function App() {
    return (
        <CollectionProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/developer/:id" element={<DeveloperDetails />} />
                    <Route path="/collection" element={<Collection />} />
                </Routes>
            </BrowserRouter>
        </CollectionProvider>
    );
}

export default App;