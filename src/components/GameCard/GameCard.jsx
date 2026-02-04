import styles from './GameCard.module.css';
import { Link } from 'react-router';

const GameCard = ({
                      id,
                      name,
                      image,
                      rating,
                      platforms
                  }) => {
    return (
        <div className={styles.gameCard}>
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={name}
                    className={styles.gameImage}
                />
                <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.gameContent}>
                <h3 className={styles.gameTitle}>{name}</h3>

                {rating && (
                    <div className={styles.gameRating}>
                        <span className={styles.star}>★</span>
                        {rating}
                    </div>
                )}

                <div className={styles.platforms}>
                    {platforms && platforms.map((p) => p.platform.name).join(', ')}
                </div>

                <Link to={`/game/${id}`} className={styles.btnDetails}>
                    Voir détails
                </Link>
            </div>
        </div>
    );
};

export default GameCard;