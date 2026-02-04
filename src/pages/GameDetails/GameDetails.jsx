import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Navbar from '../../components/Navbar/Navbar.jsx';
import styles from './GameDetails.module.css';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [inCollection, setInCollection] = useState(false);
    const [status, setStatus] = useState('backlog');
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setGame(data);
            })
            .catch(error => {
                console.log(error);
            });

        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setScreenshots(data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!game) {
        return (
            <div className={styles.container}>
                <Navbar />
                <div className={styles.loading}>Chargement...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.content}>
                <img
                    src={game.background_image}
                    alt={game.name}
                    className={styles.banner}
                />

                <div className={styles.info}>
                    <h1 className={styles.title}>{game.name}</h1>

                    <div className={styles.meta}>
                        <span>📅 Sortie : {game.released}</span>
                        {game.rating && <span>⭐ Note : {game.rating}/5</span>}
                        <span>⏱️ Temps de jeu : {game.playtime}h</span>
                    </div>

                    <div className={styles.collectionControls}>
                        <button onClick={() => setInCollection(!inCollection)}>
                            {inCollection ? "Retirer de la collection" : "Ajouter à ma collection"}
                        </button>

                        {inCollection && (
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="backlog">À faire</option>
                                <option value="playing">En cours</option>
                                <option value="completed">Terminé</option>
                                <option value="dropped">Abandonné</option>
                            </select>
                        )}
                    </div>

                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: game.description }}
                    />

                    <div className={styles.section}>
                        <h3>Genres</h3>
                        <div className={styles.tags}>
                            {game.genres && game.genres.map(g => (
                                <span key={g.id} className={styles.badge}>{g.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <p>
                            <strong>Développeurs :</strong>{' '}
                            {game.developers && game.developers.map(d => (
                                <Link key={d.id} to={`/developer/${d.id}`} className={styles.devLink}>
                                    {d.name}
                                </Link>
                            ))}
                        </p>
                        <p><strong>Éditeurs :</strong> {game.publishers?.map(p => p.name).join(', ')}</p>
                    </div>

                    <div className={styles.section}>
                        <h3>Plateformes</h3>
                        <div className={styles.tags}>
                            {game.platforms && game.platforms.map(p => (
                                <span key={p.platform.id} className={styles.tag}>
                                    {p.platform.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {screenshots && (
                        <div className={styles.gallery}>
                            <h3>Galerie</h3>
                            <div className={styles.galleryGrid}>
                                {screenshots.map(screen => (
                                    <img
                                        key={screen.id}
                                        src={screen.image}
                                        alt="screenshot"
                                        className={styles.screenshot}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameDetails;