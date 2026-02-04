import React, { useEffect, useState } from 'react';
import styles from "./SearchBar.module.css";

const SearchBar = ({ search, setSearch }) => {
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debouncedSearch);
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [debouncedSearch, setSearch]);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    value={debouncedSearch}
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    placeholder="Rechercher un jeu..."
                    className={styles.searchInput}
                />
                <span className={styles.searchIcon}>🔍</span>
            </div>

            {debouncedSearch && (
                <div className={styles.resultsContainer}>
                    <p className={styles.resultsText}>
                        Résultats pour : <span className={styles.searchTerm}>"{debouncedSearch}"</span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default SearchBar;