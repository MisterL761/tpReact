import React from 'react';
import styles from "./SearchBar.module.css";

const SearchBar = ({ search, setSearch }) => {

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un jeu..."
                    className={styles.searchInput}
                />
                <span className={styles.searchIcon}>🔍</span>
            </div>

            <button className={styles.searchButton}>
                <span>Rechercher</span>
            </button>

            {search && (
                <div className={styles.resultsContainer}>
                    <p className={styles.resultsText}>
                        Résultats pour : <span className={styles.searchTerm}>"{search}"</span>
                        <span className={styles.loadingDots}></span>
                    </p>
                </div>
            )}
        </div>
    )
}

export default SearchBar;