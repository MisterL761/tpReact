import styles from './GameCard.module.css';

const GameCard = ({ game }) => {
    return (
        <div className={styles.gameCard}>
            <div className={styles.imageContainer}>
                <img
                    src={game.background_image}
                    alt={game.name}
                    className={styles.gameImage}
                />
                <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.gameContent}>
                <h3 className={styles.gameTitle}>{game.name}</h3>

                {game.rating && (
                    <div className={styles.gameRating}>
                        <span className={styles.star}>★</span>
                        {game.rating}
                    </div>
                )}

                <div className={styles.platforms}>
                    {game.platforms && game.platforms.map((p) => p.platform.name).join(', ')}
                </div>
            </div>
        </div>
    );
};

export default GameCard;