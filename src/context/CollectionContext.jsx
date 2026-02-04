import { createContext, useState, useEffect } from 'react';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        const savedCollection = JSON.parse(localStorage.getItem('collection')) || [];
        setCollection(savedCollection);
    }, []);

    useEffect(() => {
        localStorage.setItem('collection', JSON.stringify(collection));
    }, [collection]);

    const addToCollection = (game) => {
        const gameData = {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            platforms: game.platforms,
            status: 'backlog',
            addedAt: new Date().toISOString(),
            playtime: game.playtime
        };
        setCollection([...collection, gameData]);
    };

    const removeFromCollection = (gameId) => {
        setCollection(collection.filter(g => g.id !== gameId));
    };

    const updateStatus = (gameId, newStatus) => {
        setCollection(collection.map(g =>
            g.id === gameId ? { ...g, status: newStatus } : g
        ));
    };

    const isInCollection = (gameId) => {
        return collection.some(g => g.id === gameId);
    };

    const getGameStatus = (gameId) => {
        const game = collection.find(g => g.id === gameId);
        return game ? game.status : 'backlog';
    };

    return (
        <CollectionContext.Provider value={{
            collection,
            addToCollection,
            removeFromCollection,
            updateStatus,
            isInCollection,
            getGameStatus
        }}>
            {children}
        </CollectionContext.Provider>
    );
};