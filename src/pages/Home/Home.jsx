import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import GameCard from "../../components/GameCard/GameCard.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import GameFilters from "../../components/GameFilters/GameFilters.jsx";
import styles from './Home.module.css';

const Home = () => {

    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [sort, setSort] = useState('-added');

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=20&ordering=${sort}${search ? '&search=' + search : ''}${genre ? '&genres=' + genre : ''}${platform ? '&platforms=' + platform : ''}`)
            .then(response => response.json())
            .then(data => {
                setGames(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, [search, genre, platform, sort])

    return (
        <div className={styles.homeContainer}>
            <Navbar />

            <div className={styles.header}>
                <h1 className={styles.title}>Découvrez des jeux</h1>
                <p className={styles.subtitle}>Explorez des milliers de jeux de la base de données RAWG</p>
            </div>

            <SearchBar search={search} setSearch={setSearch} />

            <GameFilters
                genre={genre} setGenre={setGenre}
                platform={platform} setPlatform={setPlatform}
                sort={sort} setSort={setSort}
            />

            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
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
                    {games.length === 0 && <p className={styles.noResults}>Aucun jeu trouvé.</p>}
                </div>
            )}

        </div>
    )
}

export default Home;