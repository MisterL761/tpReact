import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import GameCard from "../../components/GameCard/GameCard.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import styles from './Home.module.css';

const Home = () => {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${search}`)
            .then(response => response.json())
            .then(data => {
                setGames(data.results);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [search])

    return (
        <div className={styles.homeContainer}>
            <Navbar />

            <div className={styles.header}>
                <h1 className={styles.title}>Découvrez des jeux</h1>
                <p className={styles.subtitle}>Explorez des milliers de jeux de la base de données RAWG</p>
            </div>

            <SearchBar search={search} setSearch={setSearch} />

            <div className={styles.gamesGrid}>
                {games && games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

        </div>
    )
}

export default Home;