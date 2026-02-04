import React, { useState, useEffect } from 'react';
import styles from './GameFilters.module.css';

const GameFilters = ({
                         genre,
                         setGenre,
                         platform,
                         setPlatform,
                         sort,
                         setSort
                     }) => {

    const [genresList, setGenresList] = useState([]);
    const [platformsList, setPlatformsList] = useState([]);

    useEffect(() => {
        fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(res => res.json())
            .then(data => setGenresList(data.results))
            .catch(err => console.log(err));

        fetch(`https://api.rawg.io/api/platforms?key=${import.meta.env.VITE_RAWG_API_KEY}`)
            .then(res => res.json())
            .then(data => setPlatformsList(data.results))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.filtersContainer}>

            <div className={styles.selectGroup}>
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Tous les genres</option>
                    {genresList.map(g => (
                        <option key={g.id} value={g.slug}>{g.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.selectGroup}>
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Toutes les plateformes</option>
                    {platformsList.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.selectGroup}>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.select}
                >
                    <option value="-added">Popularité</option>
                    <option value="-rating">Note</option>
                    <option value="-released">Date de sortie</option>
                    <option value="name">Nom</option>
                </select>
            </div>

        </div>
    );
};

export default GameFilters;