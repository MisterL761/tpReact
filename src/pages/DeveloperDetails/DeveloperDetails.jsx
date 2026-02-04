import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar/Navbar.jsx';
import GameCard from '../../components/GameCard/GameCard.jsx';
import styles from './DeveloperDetails.module.css';

const DeveloperDetails = () => {
    const { id } = useParams();
    const [developer, setDeveloper] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch(`https://api.rawg.io/api/developers/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setDeveloper(data);
            })
            .catch(error => {
                console.log(error);
            });

        fetch(`https://api.rawg.io/api/games?developers=${id}&key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setGames(data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!developer) {
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
                    src={developer.image_background}
                    alt={developer.name}
                    className={styles.banner}
                />

                <div className={styles.info}>
                    <h1 className={styles.title}>{developer.name}</h1>

                    <div className={styles.meta}>
                        <span>🎮 Nombre de jeux : {developer.games_count}</span>
                    </div>

                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: developer.description }}
                    />

                    <div className={styles.gamesSection}>
                        <h2>Jeux de ce développeur</h2>
                        <div className={styles.gamesGrid}>
                            {games && games.map(game => (
                                <GameCard
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    image={game.background_image}
                                    rating={game.rating}
                                    platforms={game.platforms}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperDetails;