import { useState, useContext } from 'react';
import { CollectionContext } from '../../context/CollectionContext.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import styles from './Collection.module.css';

const Collection = () => {
    const { collection, removeFromCollection, updateStatus } = useContext(CollectionContext);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGames = collection.filter(game => {
        const matchesStatus = filterStatus === 'all' || game.status === filterStatus;
        const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = {
        total: collection.length,
        toPlay: collection.filter(g => g.status === 'backlog').length,
        playing: collection.filter(g => g.status === 'playing').length,
        completed: collection.filter(g => g.status === 'completed').length,
        abandoned: collection.filter(g => g.status === 'dropped').length,
        totalPlaytime: collection.reduce((sum, g) => sum + (g.playtime || 0), 0)
    };

    return (
        <div className={styles.container}>
            <Navbar collectionCount={collection.length} />

            <div className={styles.content}>
                <h1 className={styles.title}>Ma Collection</h1>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <h3>Total</h3>
                        <p>{stats.total}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>À faire</h3>
                        <p>{stats.toPlay}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>En cours</h3>
                        <p>{stats.playing}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Terminés</h3>
                        <p>{stats.completed}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Abandonnés</h3>
                        <p>{stats.abandoned}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Temps total</h3>
                        <p>{stats.totalPlaytime}h</p>
                    </div>
                </div>

                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Rechercher un jeu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">Tous</option>
                        <option value="backlog">À faire</option>
                        <option value="playing">En cours</option>
                        <option value="completed">Terminés</option>
                        <option value="dropped">Abandonnés</option>
                    </select>
                </div>

                {filteredGames.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Aucun jeu dans votre collection</p>
                    </div>
                ) : (
                    <div className={styles.gamesGrid}>
                        {filteredGames.map(game => (
                            <div key={game.id} className={styles.gameItem}>
                                <GameCard
                                    id={game.id}
                                    name={game.name}
                                    image={game.background_image}
                                    rating={game.rating}
                                    platforms={game.platforms}
                                />

                                <div className={styles.gameActions}>
                                    <select
                                        value={game.status}
                                        onChange={(e) => updateStatus(game.id, e.target.value)}
                                        className={styles.statusSelect}
                                    >
                                        <option value="backlog">À faire</option>
                                        <option value="playing">En cours</option>
                                        <option value="completed">Terminé</option>
                                        <option value="dropped">Abandonné</option>
                                    </select>

                                    <button
                                        onClick={() => removeFromCollection(game.id)}
                                        className={styles.removeBtn}
                                    >
                                        Retirer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collection;